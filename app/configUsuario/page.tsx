'use client';
import axios from "axios";
import { usersHeaders } from "@/components/table/Columns";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UsersTable } from "@/components/table/UsersTable";
import { UserType } from "@/types/userType";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, UserPlus2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";



export default function IndexPage() {
  const { token } = useAuthContext();
  const { toast } = useToast();



  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  });


  useEffect(() => {
    if (token) getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  async function getUsers() {
    axios.get('/api/data/getUsers', { headers: { token } })
      .then(async (response) => {
        const users = await response.data.result.map((user: any) => ({
          name: user.usuario,
          role: user.cargo,
          clients: user.clientes
        }));

        setUsers(users);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function createUser(data: any) {
    setLoading(true);
    data.token = token;

    axios.post('/api/config/editUser', data).then(response => {
      setLoading(false);
      getUsers();

      toast({
        title: 'Sucesso',
        description: 'Usuário criado com sucesso!',
        variant: 'sucess',
      });
    }
    ).catch((err) => {
      setLoading(false);
      toast({
        title: 'Erro',
        description: err.response.data.message,
        variant: 'destructive',
      });
    });
  }


  return (
    <section className="flex w-full justify-center">
      <div className="flex flex-col gap-4 overflow-auto rounded-lg  p-2 py-4  md:p-10 lg:p-10">
        <h2 className=" rounded border-b bg-muted p-2 text-center text-xl font-bold shadow">Gestão de Usuários</h2>

        <div className="grid w-full grid-cols-1 gap-y-4 md:gap-x-4  lg:grid-cols-3  lg:gap-x-4">

          <Card className="h-fit w-full border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Criar Usuário</CardTitle>
              <CardDescription>Preencha as informações abaixo para criar um usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(createUser)}>
                <div className="grid w-full items-center gap-4">

                  <div className="flex flex-col space-y-1.5">
                    <div>
                      <Label htmlFor="user">Usuário </Label>
                      <Input id="user" {...register("user")} required />
                    </div>

                    <div>
                      <Label htmlFor="password">Senha <span className="text-xs text-muted-foreground"> / Max 12 caracteres</span></Label>
                      <Input id="password" type="password" {...register("password")} required />
                    </div>
                  </div>
                </div>
                <CardFooter className="mt-4 flex w-full justify-end p-0">
                  <Button type="submit" disabled={loading} className=" h-full items-center bg-emerald-500 hover:bg-emerald-800">{loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" />Aguarde...</div> : <div className="flex items-center gap-2"><UserPlus2 />Criar Usuário</div>}</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="col-span-2">
            <UsersTable updateUsers={
              getUsers
            } columns={usersHeaders} data={users} />
          </div>
        </div>


      </div>

    </section>
  );
}
