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
import { UserTimelineType } from "@/types/timelineType";





export function TimelineUserDialog({ login_ad }: { login_ad: string; }) {
  const { token } = useAuthContext();

  const [timeline, setTimeline] = useState<UserTimelineType[]>([]);


  const [open, setOpen] = useState(false);


  function getTimeline() {


    axios.post('/api/data/getUserTimeline', { token, login_ad })
      .then(async (response) => {
        const timeline = await response.data.result.map((history: any) => ({
          login_ad: history.login_ad,
          action: history.acao,
          date: history.data,
          responsible: history.responsavel,
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
        <Button variant="secondary" title="Ver Histórico" onClick={getTimeline}><History /></Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Histórico do Usuário</DialogTitle>
          <DialogDescription>
            {login_ad}
          </DialogDescription>
        </DialogHeader>


        <div className="mt-2 flex flex-col px-4">
          {timeline.map((history, index) => (
            <div key={index + history.action} className="flex h-32">
              <div className="mr-2 shrink-0 border-l-4">
                <div className={`-ml-3.5 flex size-6 items-center justify-center rounded-full ${history.action == 'Criado' ? 'bg-emerald-500' : 'bg-blue-500'
                  } text-white`}>
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

                      <p>
                        <strong>Usuário:</strong> {history.login_ad}
                      </p>

                      <p>
                        <strong>Responsável:</strong> {history.responsible}
                      </p>
                    </div>
                  </div>




                </div>
              </div>
            </div>
          ))}
        </div>



      </DialogContent>
    </Dialog>
  );
}
