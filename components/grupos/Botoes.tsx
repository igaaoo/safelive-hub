import { buttonVariants } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";


export function Botoes() {

  return (
    <div className="mt-2 flex flex-wrap gap-4">

      <button
        className={buttonVariants()}
      >
        Primário
      </button>

      <button
        className={buttonVariants({ variant: "outline" })}
      >
        Contornado
      </button>

      <button
        className={buttonVariants({ variant: "destructive" })}
      >
        Destrutivo
      </button>

      <button
        className={buttonVariants({ variant: "ghost" })}
      >
        Fantasma
      </button>


      <button
        className={buttonVariants({ variant: "link" })}
      >
        Link
      </button>


      <Button>
        <Mail className="mr-2 size-4" /> Login com Email
      </Button>

      <Button disabled>
        <Loader2 className="mr-2 size-4 animate-spin" />
        Aguarde
      </Button>

    </div>
  );
}