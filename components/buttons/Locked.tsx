import { Lock } from "lucide-react";

export function Locked({ title }: { title?: string; }) {
  return (
    <div className="items-center rounded bg-secondary px-4 py-2.5 align-middle text-secondary-foreground hover:bg-secondary/80 " title={title || 'Bloqueado'} ><Lock className="size-4" /></div>
  );
}