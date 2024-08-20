"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { TimelineProposalDialog } from "@/components/dialog/proposal/TimelineItemDialog";
import { EditProposalDialog } from "@/components/dialog/proposal/EditProposal";


export type ProposalsType = {
  COD_EMPRESA: string;
  EMPRESA: string;
  COD_PROPOSTA: string;
  COD_CLIENTE: string;
  NOME_CLIENTE: string;
  PRODUTO: string;
  MODELO: string;
  STATUS_PROPOSTA: string;
  DATA_VENDA: string;
  EMISSAO: string;
  INTERNET: string;
  CANAL: string;
  CHASSI_COMPLETO: string;
  VENDEDOR: string;


  VALOR_VENDA: string;
  TIPO_CLIENTE: string;
  TEVE_CONTATO: string;
  FORMA_CONTATO: string;
  STATUS_VENDA: string;
  MOTIVO_SEM_VENDA: string;
  OBSERVACAO: string;
  VENDEDOR_PARTICIPOU: string;
};



export const proposalsHeaders: ColumnDef<ProposalsType>[] = [
  {
    accessorKey: "COD_PROPOSTA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposta" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("COD_PROPOSTA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "COD_EMPRESA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cod. Emp." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("COD_EMPRESA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "EMPRESA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("EMPRESA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "COD_CLIENTE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cod. Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("COD_CLIENTE")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "NOME_CLIENTE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("NOME_CLIENTE")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "PRODUTO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produto" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("PRODUTO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "MODELO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("MODELO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "STATUS_PROPOSTA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("STATUS_PROPOSTA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "DATA_VENDA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Venda" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("DATA_VENDA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "EMISSAO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emissão" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("EMISSAO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "INTERNET",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Internet" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("INTERNET")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "CANAL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Canal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("CANAL")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "CHASSI_COMPLETO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chassi" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("CHASSI_COMPLETO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "VENDEDOR",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendedor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("VENDEDOR")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) =>

      <div className="flex gap-2">
        {/* <TimelineProposalDialog proposal={row.getValue("COD_PROPOSTA")} /> */}
        <EditProposalDialog proposal={row.getValue("COD_PROPOSTA")} type="restricted" />
      </div>
  },
  // {
  //   accessorKey: "base",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Base" className="float-left m-0 hidden p-0" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="float-left m-0 hidden p-0">
  //         <span> {row.getValue("base")}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
];

export const proposalsHeadersGeral: ColumnDef<ProposalsType>[] = [
  {
    accessorKey: "COD_PROPOSTA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposta" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("COD_PROPOSTA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "COD_EMPRESA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cod. Emp." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("COD_EMPRESA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "EMPRESA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("EMPRESA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "COD_CLIENTE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cod. Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("COD_CLIENTE")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "NOME_CLIENTE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("NOME_CLIENTE")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "PRODUTO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produto" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("PRODUTO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "MODELO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("MODELO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "STATUS_PROPOSTA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("STATUS_PROPOSTA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "DATA_VENDA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Venda" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("DATA_VENDA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "EMISSAO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emissão" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("EMISSAO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "INTERNET",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Internet" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("INTERNET")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "CANAL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Canal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("CANAL")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "CHASSI_COMPLETO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chassi" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("CHASSI_COMPLETO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "VENDEDOR",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendedor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("VENDEDOR")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "VALOR_VENDA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Venda" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("VALOR_VENDA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "TIPO_CLIENTE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("TIPO_CLIENTE")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "TEVE_CONTATO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teve Contato" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("TEVE_CONTATO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "FORMA_CONTATO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Forma Contato" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("FORMA_CONTATO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "STATUS_VENDA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Venda" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("STATUS_VENDA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "MOTIVO_SEM_VENDA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Motivo Sem Venda" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("MOTIVO_SEM_VENDA")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "OBSERVACAO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observação" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("OBSERVACAO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "VENDEDOR_PARTICIPOU",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendedor Participou" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("VENDEDOR_PARTICIPOU")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "AGENTE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("AGENTE")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "PRIMEIRO_REGISTRO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primeiro Registro" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("PRIMEIRO_REGISTRO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "ULTIMA_ATUALIZACAO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última Atualização" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("ULTIMA_ATUALIZACAO")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) =>

      <div className="flex gap-2">
        {/* <TimelineProposalDialog proposal={row.getValue("COD_PROPOSTA")} /> */}
        <EditProposalDialog proposal={row.getValue("COD_PROPOSTA")} type="all" />
      </div>
  },
];


