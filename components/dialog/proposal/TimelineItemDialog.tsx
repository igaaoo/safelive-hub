import axios from "axios";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { History } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { ProposalTimelineType } from "@/types/timelineType";
import { cn } from "@/lib/utils";




export function TimelineProposalDialog({ proposal }: { proposal: string; }) {
  const { token } = useAuthContext();

  const [timeline, setTimeline] = useState<ProposalTimelineType[]>([]);


  const [open, setOpen] = useState(false);


  function getTimeline() {

    axios.post('/api/data/getProposalTimeline', { token, proposal })
      .then(async (response) => {
        const timeline = await response.data.result.map((history: any) => ({
          action: history.acao,
          date: new Date(history.data).toLocaleString(),
          responsible: history.responsavel,
          description: history.descricao,
          obs: history.obs
        }));

        setTimeline(timeline);

      })
      .catch(err => {
        console.log(err);
      });
  };




  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" title="Ver Histórico" size="sm" onClick={getTimeline}><History /></Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%]  overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Histórico da Proposta</DialogTitle>
          <DialogDescription>
            Movimentações da Proposta <strong>{proposal}</strong>
          </DialogDescription>
        </DialogHeader>

        {timeline.length == 0 &&
          <div className="flex items-center justify-center rounded bg-muted p-10">
            <p>Nenhuma movimentação encontrada</p>
          </div>
        }

        <div className="mt-2 flex flex-col px-4">
          {timeline.map((history, index) => (
            <div key={index + history.action} className="flex h-32">
              <div className="mr-2 shrink-0 border-l-4">
                <div className={
                  cn("-ml-3.5 flex size-6 items-center justify-center rounded-full bg-gray-500 text-white",
                    history.action == 'Preço Alterado' && 'bg-emerald-500',
                    history.action == 'Tipo Alterado' && 'bg-amber-500',
                    history.action == 'Situação Alterada' && 'bg-blue-500',
                  )
                }>
                  {index + 1}
                </div>
              </div>
              <div className="flex grow flex-col p-2">
                <div className="mb-2 flex w-full justify-between border-b-2 py-1">
                  <div className="text-lg font-semibold text-gray-700">{history.action}</div>
                  <div className="mb-2 text-sm text-gray-500"><strong>{history.date}</strong></div>
                </div>

                <div className="text-gray-500">
                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">

                      {history.responsible &&
                        <p>
                          <strong>Responsável:</strong> {history.responsible}
                        </p>
                      }

                    </div>
                  </div>


                  <div >
                    {history.description &&
                      <p className="max-w-sm truncate" title={history.description}>
                        <strong>Descrição:</strong> {history.description}
                      </p>
                    }
                  </div>

                  <div >
                    {history.obs &&
                      <p>
                        <strong>Obs:</strong> {history.obs}
                      </p>
                    }
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>



      </DialogContent>
    </Dialog >
  );
}
