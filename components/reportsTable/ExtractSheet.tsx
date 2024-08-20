import { useState } from "react";
import * as XLSX from "xlsx";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReportsType } from "./components/columns";
import { CSVLink } from "react-csv";
import { Sheet } from "lucide-react";
import { useDataContext } from "@/context/DataContext";

const headers = [
  { label: "Cliente", key: "cliente" },
  { label: "Aluno", key: "aluno" },
  { label: "Data", key: "data" },
  { label: "Duracao", key: "duracao" },
  { label: "Nota", key: "nota" }
];



export function ExtractSheet() {
  const [open, setOpen] = useState(false);

  const { reportsData } = useDataContext();


  const downloadxls = (e: { preventDefault: () => void; }, data: ReportsType[], name: string) => {
    console.log(data);
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [[
      "Cliente",
      "Aluno",
      "Data",
      "Duracao",
      "Nota"
    ]], { origin: "A1" });
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, `${name}.xlsx`);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className=" w-fit whitespace-nowrap"> <Sheet className="mr-2 size-4" />Extrair Relatório</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Extrair Relatório</DialogTitle>
          <DialogDescription>
            Selecione o formato que deseja.
          </DialogDescription>
        </DialogHeader>


        <div className="flex w-full justify-evenly">
          <CSVLink data={reportsData} headers={headers} filename={"Relatorio.csv"} >
            <Button className="shadow">
              <Sheet className="mr-2 size-4" />
              Extrair para Libre
            </Button>
          </CSVLink>

          <Button className="shadow" onClick={(e) => {
            downloadxls(e, reportsData, "Relatorio");
          }}>
            <Sheet className="mr-2 size-4" />
            Extrair para Excel
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  );
}
