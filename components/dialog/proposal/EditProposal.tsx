import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDataContext } from "@/context/DataContext";

export function EditProposalDialog({ proposal, type }: { proposal: string; type: string; }) {
  const { token } = useAuthContext();
  const { updateProposalsData } = useDataContext();

  const [loading, setLoading] = useState(false);
  const [proposalInfo, setProposalInfo] = useState<{
    saleValue: number;
    clientType: string;
    hadContact: string;
    contactType: string;
    saleStatus: string;
    noSaleReason: string;
    sellerParticipated: string;
    observation: string;
  } | null>();

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    mode: 'onSubmit',
  });

  const saleStatus = watch("saleStatus");
  const hadContact = watch("hadContact");

  useEffect(() => {
    if (saleStatus !== "SEM VENDA") {
      setValue("noSaleReason", "");
      setValue("observation", "");
    }

    if (hadContact !== "SIM") {
      setValue("contactType", "");
    }
  }, [saleStatus, setValue, hadContact]);

  function getProposalInfos() {
    axios.get('/api/data/proposalInfo', { headers: { token: token, proposal: proposal } })
      .then(async (response) => {
        setProposalInfo({
          saleValue: response.data.result.VALOR_VENDA,
          clientType: response.data.result.TIPO_CLIENTE,
          hadContact: response.data.result.TEVE_CONTATO,
          contactType: response.data.result.FORMA_CONTATO,
          saleStatus: response.data.result.STATUS_VENDA,
          noSaleReason: response.data.result.MOTIVO_SEM_VENDA,
          observation: response.data.result.OBSERVACAO,
          sellerParticipated: response.data.result.VENDEDOR_PARTICIPOU,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;

    data.saleValue ?? proposalInfo?.saleValue;
    data.clientType ??= proposalInfo?.clientType;
    data.hadContact ??= proposalInfo?.hadContact;
    data.contactType ??= proposalInfo?.contactType;
    data.saleStatus ??= proposalInfo?.saleStatus;
    data.noSaleReason ??= proposalInfo?.noSaleReason;
    data.sellerParticipated ??= proposalInfo?.sellerParticipated;
    data.observation ??= proposalInfo?.observation;


    axios.post('/api/data/proposalInfo', data)
      .then(async () => {
        setLoading(false);
        setOpen(false);

        updateProposalsData(type);

        toast({
          title: "Informações Salvas",
          description: "Proposta atualizada",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" title="Editar Proposta / Inserir Informações" size="sm" onClick={getProposalInfos} className="flex gap-2 text-nowrap"><Pencil size={20} /></Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%]  overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Informações da Proposta</DialogTitle>
          <DialogDescription>
            Editar informações da proposta
          </DialogDescription>
        </DialogHeader>

        {(type === "all" && proposalInfo) &&
          <form className="flex flex-col gap-4 md:grid md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="proposal" className="font-medium text-gray-700">
                Proposta
              </Label>
              <Input id="proposal" {...register("proposal")} type="text" defaultValue={proposal} readOnly />
            </div>

            {proposalInfo?.saleStatus !== "SEM VENDA" &&
              <div>
                <Label htmlFor="saleValue" className="font-medium text-gray-700">
                  Valor Venda
                </Label>
                <Input id="saleValue" {...register("saleValue")} type="number" max="60000.00" min="0.01" step={0.01} defaultValue={proposalInfo?.saleValue} required />
              </div>
            }

            <div>
              <Label htmlFor="clientType" className="font-medium text-gray-700">
                Tipo de Cliente
              </Label>
              <Select onValueChange={(value) => setValue("clientType", value)} defaultValue={proposalInfo?.clientType} required>
                <SelectTrigger id="clientType">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ORGÂNICO">ORGÂNICO</SelectItem>
                  <SelectItem value="PEDALADA">PEDALADA</SelectItem>
                  <SelectItem value="LOJISTA">LOJISTA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hadContact" className="font-medium text-gray-700">
                Teve Contato?
              </Label>
              <Select onValueChange={(value) => setValue("hadContact", value)} required defaultValue={proposalInfo?.hadContact}>
                <SelectTrigger id="hadContact">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NÃO">NÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>



            <div>
              <Label htmlFor="contactType" className="font-medium text-gray-700">
                Tipo de Contato
              </Label>
              <Select onValueChange={(value) => setValue("contactType", value)} required defaultValue={proposalInfo?.contactType}>
                <SelectTrigger id="contactType">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="PRESENCIAL">PRESENCIAL</SelectItem>
                  <SelectItem value="TELEFONE">TELEFONE</SelectItem>
                  <SelectItem value="PROSPECÇÃO">PROSPECÇÃO</SelectItem>
                  <SelectItem value="CLIENTE ME CONTACTOU">CLIENTE ME CONTACTOU</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div>
              <Label htmlFor="saleStatus" className="font-medium text-gray-700">
                Status da Venda
              </Label>
              <Select onValueChange={(value) => setValue("saleStatus", value)} required defaultValue={proposalInfo?.saleStatus}>
                <SelectTrigger id="saleStatus">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="EFETIVADA">EFETIVADA</SelectItem>
                  <SelectItem value="SEM VENDA">SEM VENDA</SelectItem>
                  <SelectItem value="EM NEGOCIAÇÃO">EM NEGOCIAÇÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {proposalInfo?.saleStatus === "SEM VENDA" && (
              <>
                <div>
                  <Label htmlFor="noSaleReason" className="font-medium text-gray-700">
                    Motivo da Não Venda
                  </Label>
                  <Select onValueChange={(value) => setValue("noSaleReason", value)} defaultValue={proposalInfo?.noSaleReason} required>
                    <SelectTrigger id="noSaleReason">
                      <SelectValue placeholder={'Selecione um valor'} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="VENDEDOR PEDIU PARA NÃO CONTACTAR">VENDEDOR PEDIU PARA NÃO CONTACTAR</SelectItem>
                      <SelectItem value="SEM CONTATO">SEM CONTATO</SelectItem>
                      <SelectItem value="CLIENTE NÃO QUIS">CLIENTE NÃO QUIS</SelectItem>
                      <SelectItem value="PREÇO">PREÇO</SelectItem>
                      <SelectItem value="CORTESIA">CORTESIA</SelectItem>
                      <SelectItem value="OUTRO">OUTRO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="observation" className="font-medium text-gray-700">
                    Observação
                  </Label>
                  <Textarea id="observation" {...register("observation")} defaultValue={proposalInfo?.observation} />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="sellerParticipated" className="font-medium text-gray-700">
                Vendedor Participou?
              </Label>
              <Select onValueChange={(value) => setValue("sellerParticipated", value)} required defaultValue={proposalInfo?.sellerParticipated}>
                <SelectTrigger id="sellerParticipated">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NÃO">NÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex w-full justify-between md:col-span-2">
              <Button variant="destructive" onClick={
                () => {
                  setOpen(false);
                  setProposalInfo(undefined);
                }
              }>Cancelar</Button>
              <SubmitButton loading={loading} />
            </div>
          </form>
        }

        {
          (type === "restricted" && !proposalInfo) &&
          <form className="flex flex-col gap-4 md:grid md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="proposal" className="font-medium text-gray-700">
                Proposta
              </Label>
              <Input id="proposal" {...register("proposal")} type="text" defaultValue={proposal} readOnly />
            </div>


            <div>
              <Label htmlFor="clientType" className="font-medium text-gray-700">
                Tipo de Cliente
              </Label>
              <Select onValueChange={(value) => setValue("clientType", value)} required>
                <SelectTrigger id="clientType">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ORGÂNICO">ORGÂNICO</SelectItem>
                  <SelectItem value="PEDALADA">PEDALADA</SelectItem>
                  <SelectItem value="LOJISTA">LOJISTA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hadContact" className="font-medium text-gray-700">
                Teve Contato?
              </Label>
              <Select onValueChange={(value) => setValue("hadContact", value)} required >
                <SelectTrigger id="hadContact">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NÃO">NÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {
              hadContact === "SIM" &&
              <div>
                <Label htmlFor="contactType" className="font-medium text-gray-700">
                  Tipo de Contato
                </Label>
                <Select onValueChange={(value) => setValue("contactType", value)} required>
                  <SelectTrigger id="contactType">
                    <SelectValue placeholder={'Selecione um valor'} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="PRESENCIAL">PRESENCIAL</SelectItem>
                    <SelectItem value="TELEFONE">TELEFONE</SelectItem>
                    <SelectItem value="PROSPECÇÃO">PROSPECÇÃO</SelectItem>
                    <SelectItem value="CLIENTE ME CONTACTOU">CLIENTE ME CONTACTOU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }


            <div>
              <Label htmlFor="saleStatus" className="font-medium text-gray-700">
                Status da Venda
              </Label>
              <Select onValueChange={(value) => setValue("saleStatus", value)} required >
                <SelectTrigger id="saleStatus">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="EFETIVADA">EFETIVADA</SelectItem>
                  <SelectItem value="SEM VENDA">SEM VENDA</SelectItem>
                  <SelectItem value="EM NEGOCIAÇÃO">EM NEGOCIAÇÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {saleStatus !== "SEM VENDA" &&
              <div>
                <Label htmlFor="saleValue" className="font-medium text-gray-700">
                  Valor Venda
                </Label>
                <Input id="saleValue" {...register("saleValue")} type="number" max="60000.00" min="0.01" step={0.01} required />
              </div>
            }


            {saleStatus === "SEM VENDA" && (
              <>
                <div>
                  <Label htmlFor="noSaleReason" className="font-medium text-gray-700">
                    Motivo da Não Venda
                  </Label>
                  <Select onValueChange={(value) => setValue("noSaleReason", value)} required>
                    <SelectTrigger id="noSaleReason">
                      <SelectValue placeholder={'Selecione um valor'} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="VENDEDOR PEDIU PARA NÃO CONTACTAR">VENDEDOR PEDIU PARA NÃO CONTACTAR</SelectItem>
                      <SelectItem value="SEM CONTATO">SEM CONTATO</SelectItem>
                      <SelectItem value="CLIENTE NÃO QUIS">CLIENTE NÃO QUIS</SelectItem>
                      <SelectItem value="PREÇO">PREÇO</SelectItem>
                      <SelectItem value="CORTESIA">CORTESIA</SelectItem>
                      <SelectItem value="OUTRO">OUTRO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="observation" className="font-medium text-gray-700">
                    Observação
                  </Label>
                  <Textarea id="observation" {...register("observation")} />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="sellerParticipated" className="font-medium text-gray-700">
                Vendedor Participou?
              </Label>
              <Select onValueChange={(value) => setValue("sellerParticipated", value)} required>
                <SelectTrigger id="sellerParticipated">
                  <SelectValue placeholder={'Selecione um valor'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NÃO">NÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex w-full justify-between md:col-span-2">
              <Button variant="destructive" onClick={
                () => {
                  setOpen(false);
                  setProposalInfo(undefined);
                }
              }>Cancelar</Button>
              <SubmitButton loading={loading} />
            </div>
          </form>
        }
      </DialogContent>
    </Dialog>
  );
}
