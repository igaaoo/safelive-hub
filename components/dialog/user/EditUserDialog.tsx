import axios from "axios";
import { useEffect, useState } from "react";

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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/types/userType";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { useToast } from "@/components/ui/use-toast";


export function EditUserDialog({ name, role, updateUsers, clients }: UserType & { updateUsers: any; }) {
  const { token } = useAuthContext();
  const { toast } = useToast();


  const [roleValue, setRoleValue] = useState(role);
  const [client, setClient] = useState(clients ? clients : '');

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [clientsDb, setClientsDb] = useState<string[]>([]);

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  });

  // Get Clients
  useEffect(() => {
    axios.get('/api/data/getClients', { headers: { token } })
      .then(response => {
        setClientsDb(response.data.result);
      }
      )
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(data: any) {
    setLoading(true);
    data.role = roleValue;
    data.token = token;
    data.user = data.name;
    data.clients = client;

    axios.put('/api/config/editUser', data)
      .then(response => {
        console.log(response);
        setLoading(false);
        updateUsers();
        setOpen(false);

        toast({
          title: 'Sucesso',
          description: 'Usuário editado com sucesso!',
          variant: 'sucess',
        });
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);

        toast({
          title: 'Erro',
          description: err.response.data.error,
          variant: 'destructive',
        });
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Editar Usuário"><Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Mude informações do usuário e confirme para salvar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-6 p-4">
          <div className="grid w-full grid-cols-1 items-center gap-2">
            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="name">Nome</Label>
              <Input type="text" id="name" {...register("name")} readOnly defaultValue={name} />
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="password">Senha</Label>
              <Input type="password" id="password" {...register("password")} autoComplete="off" aria-autocomplete="none" />
            </div>

            <div className=" items-center gap-2 ">
              <Label className="font-medium text-gray-700">Clientes:</Label>
              <div className="grid h-44 grid-cols-2 gap-1 overflow-y-auto text-sm">
                {clientsDb.map((clientName, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={clientName}
                      value={clientName}
                      checked={client.includes(clientName)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setClient((prev) => prev ? `${prev},${clientName}` : clientName);
                        } else {
                          setClient((prev) => prev.split(',').filter((item) => item !== clientName).join(','));
                        }
                      }}
                    />
                    <label htmlFor={clientName}>{clientName}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="role">Cargo</Label>
              <Select onValueChange={(value) => {
                setRoleValue(value.toString());
              }}>
                <SelectTrigger id="role">
                  <SelectValue placeholder={role} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="tecnico">Técnico</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="administrador">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>



          </div>
          <div className="flex w-full justify-end">
            <SubmitButton loading={loading} title="Confirmar" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
