'use client';
import axios from "axios";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { UserPlus2, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


import { ClientsTable } from "@/components/table/ClientsTable";
import { clientsHeaders } from "@/components/table/Columns";

export type ClientsType = {
  cliente: string;
  cliente_logo?: Buffer | undefined;
  treinamentos: number | undefined;
  prazo: Date | undefined;
  cliente_numero: string | undefined;
  cliente_senha?: string;
};

function getBrasilDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}


export default function IndexPage() {
  const { token } = useAuthContext();

  const [clients, setClients] = useState<ClientsType[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File>();


  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  });


  useEffect(() => {
    if (token) getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;

    const formData = new FormData();


    formData.append('cliente', data.cliente);
    formData.append('cliente_senha', data.cliente_senha);
    formData.append('cliente_numero', data.cliente_numero);
    formData.append('treinamentos', data.treinamentos);
    formData.append('prazo', data.prazo);
    formData.append('cliente_logo', selectedFile || '');
    formData.append('token', data.token);
    formData.append('user', data.user);


    axios.post('/api/config/editClient', formData).then(response => (
      console.log(response)
    )).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
      getClients();
    });


    setLoading(false);
  }

  async function getClients() {
    axios.get('/api/data/getClients', { headers: { token } })
      .then(async (response) => {
        const clients = await response.data.clients.map((client: any) => ({
          cliente: client.cliente,
          cliente_logo: client.cliente_logo,
          treinamentos: client.treinamentos,
          prazo: getBrasilDate(new Date(client.prazo)),
          cliente_numero: client.cliente_numero,
          cliente_senha: client.cliente_senha
        }));

        setClients(clients);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };


  return (
    <section className="flex w-full justify-center">
      <div className="flex flex-col gap-4 overflow-auto rounded-lg  p-2 py-4  md:p-10 lg:p-10">
        <h2 className=" rounded border-b bg-muted p-2 text-center text-xl font-bold shadow">Configurar Clientes</h2>

        <div className="grid w-full grid-cols-1 gap-y-4  md:grid-cols-1 md:gap-x-4 lg:grid-cols-3 lg:gap-x-4">

          <Card className="h-fit w-full border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Cadastrar Cliente</CardTitle>
              <CardDescription>Preencha as informações abaixo para cadastrar um cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">

                  <div className="flex flex-col space-y-1.5">
                    <Input id="cliente" {...register("cliente")} placeholder="Cliente" required />

                    <Input id="cliente_senha" {...register("cliente_senha")} type="password" required placeholder="Senha / Max 12 Dígitos" maxLength={12} />

                    <Input maxLength={3} id="cliente_numero" {...register("cliente_numero")} type="number" required placeholder="Número do Cliente / Max 3 Dígitos" />

                    <Input maxLength={3} id="treinamentos" {...register("treinamentos")} type="number" required placeholder="Treinamentos" />

                    <Input id="prazo" {...register("prazo")} type="date" required />

                    <Input id="cliente_logo" required {...register("cliente_logo")} type="file" accept="image/png"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <CardFooter className="mt-4 flex w-full justify-end p-0">
                  <Button type="submit" disabled={loading} className=" h-full items-center bg-emerald-500 hover:bg-emerald-800">{loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" />Aguarde...</div> : <div className="flex items-center gap-2"><UserPlus2 />Cadastrar Cliente</div>}</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>


          <div className="col-span-2">
            <ClientsTable
              updateClients={
                getClients
              }
              columns={clientsHeaders}
              data={clients} />
          </div>
        </div>


      </div>

    </section>
  );
}
