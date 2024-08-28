import axios from "axios";
import { useState } from "react";


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
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useAuthContext } from "@/context/AuthContext";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { ClientsType } from "@/app/configClientes/page";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";



export function EditClientDialog({ cliente, cliente_logo, cliente_numero, cliente_senha, treinamentos }: ClientsType) {
  const { token, user } = useAuthContext();

  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File>();



  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    mode: 'onSubmit'
  });

  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;
    data.user = user;


    const formData = new FormData();

    formData.append('cliente', data.cliente);
    formData.append('cliente_senha', data.cliente_senha);
    formData.append('cliente_numero', data.cliente_numero);
    formData.append('treinamentos', data.treinamentos);
    formData.append('prazo', data.prazo);
    formData.append('cliente_logo', selectedFile || '');
    formData.append('token', data.token);
    formData.append('user', data.user);



    try {
      const response = await axios.put('/api/config/editClient', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      toast({
        title: "Cliente editado",
        variant: "sucess",
        description: "As informações do cliente foram atualizadas"
      });
      setLoading(false);

    } catch (err) {
      console.log(err);
      toast({
        title: "Erro ao editar cliente",
        variant: "destructive",
        description: "Ocorreu um erro ao editar as informações do cliente"
      });
      setLoading(false);

    }
    setOpen(false);
  }


  async function deleteClient() {
    setLoading(true);

    axios.delete('/api/config/editClient', {
      data: {
        token: token,
        user: user,
        cliente
      }
    }).then(response => {
      console.log(response);
      setLoading(false);
    }
    ).catch((err) => {
      console.log(err);
    });
    setOpen(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Editar Loja"><Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Edite as informações do cliente abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-6 p-10">
          <div className="grid w-full grid-cols-1 items-center gap-6">
            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="cliente">Cliente</Label>
              <Input type="text" id="cliente" {...register("cliente")} defaultValue={cliente} readOnly />
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="cliente_senha">Senha</Label>
              <Input type="password" id="cliente_senha" {...register("cliente_senha")} defaultValue={cliente_senha} />
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="cliente_numero">Número do Cliente</Label>
              <Input type="number" id="cliente_numero" {...register("cliente_numero")} defaultValue={cliente_numero} />
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="treinamentos">Treinamentos</Label>
              <Input type="number" id="treinamentos" {...register("treinamentos")} defaultValue={treinamentos} />
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="prazo">Prazo</Label>
              <Input id="prazo" {...register("prazo")} type="date" required />
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" >Logo</Label>
              {cliente_logo && (
                <Image
                  src={`data:image/png;base64,${Buffer.from(cliente_logo).toString('base64')}`}
                  alt="logo"
                  width={150}
                  height={40}
                  className="m-auto p-4"
                />
              )}
              <Input
                type="file"
                accept="image/png"
                onChange={handleFileChange} // Usar o manipulador de arquivo
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <Button title="Remover Cliente" variant="destructive" onClick={() => deleteClient()}>Remover Cliente</Button>
            <SubmitButton loading={loading} title="Confirmar" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
