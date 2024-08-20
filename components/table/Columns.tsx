"use client";
import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "@/types/userType";
import { EditClientDialog } from "../dialog/client/EditClientDialog";
import { ClientsType } from "@/app/configClientes/page";


export const usersHeaders: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Usuário",
  },
  {
    accessorKey: "role",
    header: "Cargo",
  },
  {
    accessorKey: "clients",
    header: "Clientes",
  },
  {
    accessorKey: "actions",
    header: "Ações",
  }
];



export const clientsHeaders: ColumnDef<ClientsType>[] = [
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "treinamentos",
    header: "Treinamentos",
  },
  {
    accessorKey: "prazo",
    header: "Prazo",
  },
  {
    accessorKey: "cliente_numero",
    header: "Número",
  },
  {
    accessorKey: "cliente_logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo: string = row.getValue("cliente_logo");
      // eslint-disable-next-line @next/next/no-img-element
      return logo ? <img src={`data:image/png;base64,${Buffer.from(logo).toString('base64')}`} alt="logo" className="size-20 object-contain" /> : null;
    }
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => <EditClientDialog cliente_logo={row.getValue("cliente_logo")} treinamentos={row.getValue("treinamentos")} cliente={row.getValue("cliente")} cliente_numero={row.getValue("cliente_numero")} prazo={row.getValue("prazo")} />,
  },
];
