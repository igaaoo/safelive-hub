'use client';

import { useDataContext } from "@/context/DataContext";

import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { ProposalsTable } from "@/components/proposalsTable/components/data-table";
import { proposalsHeadersGeral } from "@/components/proposalsTable/components/columns";
import { useEffect } from "react";


export default function IndexPage() {
  const { token, role } = useAuthContext();

  const { proposalsData, updateProposalsData } = useDataContext();

  useEffect(() => {
    if (token) {
      updateProposalsData("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="mt-2 flex w-full justify-center">

      {
        role === 'usuario' ?
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={64} />
            <p className="text-lg">Usuário não autorizado. Favor entrar em contato com departamento responsável.</p>
          </div>
          :
          <div className="flex flex-col gap-4 overflow-auto rounded-lg  text-center">
            <ProposalsTable columns={proposalsHeadersGeral} data={proposalsData} />
          </div>
      }
    </section>
  );
}
