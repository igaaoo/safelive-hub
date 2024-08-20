'use client';
import { ReactNode, useState } from 'react';
import DataContext, { DataContextType } from './DataContext';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import { toast } from '@/components/ui/use-toast';


interface DataContextProviderProps {
  children: ReactNode;
}

function getBrasilDate(date: string) {
  if (date == null) return 'N/A';

  const oracleDate = date.split('T')[0];
  const dateArray = oracleDate.split('-');
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}


const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const { token } = useAuthContext();


  const [reportsData, setReportsData] = useState<any>({});
  const [clientsFilter] = useState<any>([]);



  function updateReportsData() {
    axios.get("/api/data/getReports", { headers: { token: token } })
      .then(async (response) => {
        const reports = await response.data.result.map((item: any) => {
          item.data = getBrasilDate(item.data);
          return {
            cliente: item.cliente,
            aluno: item.aluno,
            data: item.data,
            nota: item.nota,
            duracao: item.duracao,
          };
        });

        clientsFilter.length = 0;

        // Setting clients filter
        let clients: any[] = [];
        reports.forEach((item: any) => {
          if (!clients.includes(item.cliente)) clients.push(item.cliente);
        });
        clients.forEach((client: any) => {
          clientsFilter.push({ label: client, value: client });
        });



        setReportsData(reports);
      }
      )

      .catch(() => {
        toast({
          title: 'Usuário não autorizado',
          description: 'Realize o login novamente.',
          variant: 'destructive',
        });

        // setTimeout(() => {
        //   window.location.href = '/login';
        // }, 1000);
      });
  }


  const contextValue: DataContextType = {
    reportsData,
    setReportsData,
    updateReportsData,
    clientsFilter
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
