'use client';

import { useDataContext } from "@/context/DataContext";

import { CircleSlash2 } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { ReportsTable } from "@/components/reportsTable/components/data-table";
import { reportsHeaders } from "@/components/reportsTable/components/columns";


export default function IndexPage() {
  const { token, role } = useAuthContext();

  const { reportsData, updateReportsData } = useDataContext();

  useEffect(() => {
    if (token) {
      updateReportsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="flex w-full justify-center 2xl:mt-12">

      {
        role === 'usuario' ?
          <div className="flex flex-col items-center gap-4 rounded bg-muted p-4">
            <CircleSlash2 size={64} color="red" />
            <p className="text-lg">Usuário não autorizado. Favor entrar em contato com departamento responsável.</p>
          </div>
          :
          <div className="flex flex-col gap-4 overflow-auto rounded-lg  text-center">
            <ReportsTable columns={reportsHeaders} data={reportsData} />
          </div>
      }
    </section>
  );
}
