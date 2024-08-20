import { AlertCircle, AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

export function Alertas() {
  return (
    <div className="flex flex-col gap-4 py-2">

      <Alert>
        <AlertTriangle className="size-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Você está prestes a excluir um item. Esta ação não pode ser desfeita.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Você deve preencher todos os campos obrigatórios.
        </AlertDescription>
      </Alert>


      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button >Mostrar Confirmação</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Você confirma os dados abaixo? </AlertDialogTitle>
            <AlertDialogDescription>
              Após confirmar os dados não poderão ser alterados. Tenha certeza de que os dados estão corretos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}