import { Botoes } from "@/components/grupos/Botoes";
import { Alertas } from "@/components/grupos/Alertas";
import { Checkboxs } from "@/components/grupos/Checkboxs";
import { Inputs } from "@/components/grupos/Inputs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DataTableDemo } from "@/components/grupos/DataTable";
import { CardWithForm } from "@/components/grupos/Cards";


export default function IndexPage() {
  return (
    <section className="container grid  items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Template de elementos para <br className="hidden sm:inline" />
          padronizar projetos do Grupo Newland.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Componentes acessíveis e prontos para uso. Basta copiar e colar.
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4 ">
        <div className=" flex  w-[550px] min-w-[400px] flex-col gap-4">
          <div className=" rounded-lg border p-4 shadow-lg">

            <h3 className=" border-b text-lg leading-tight tracking-tighter">Botões</h3>
            <Botoes />
          </div>

          <div className="rounded-lg border p-4 shadow-lg">

            <h3 className=" mt-2 border-b text-lg leading-tight tracking-tighter">Checkbox</h3>
            <Checkboxs />
          </div>

          <div className="rounded-lg border p-4 shadow-lg">

            <h3 className=" mt-2 border-b text-lg leading-tight tracking-tighter">Inputs</h3>
            <Inputs />
          </div>

          <div className="rounded-lg border p-4 shadow-lg">

            <h3 className=" tracking- my-2 border-b text-lg leading-tight">Cards</h3>
            <CardWithForm title="Tela de Login " description="Faça login para continuar." />
          </div>
        </div>
        <div className="flex w-[550px] flex-col gap-4">
          <div className=" rounded-lg border p-4 shadow-lg">

            <h3 className=" border-b text-lg leading-tight tracking-tighter">Alertas</h3>
            <Alertas />
          </div>

          <div className=" rounded-lg border p-4 shadow-lg">

            <h3 className=" mb-2 border-b text-lg leading-tight tracking-tighter">Select / Switch</h3>
            <div className="flex items-center gap-4">

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matriz">Matriz</SelectItem>
                  <SelectItem value="Kennedy">Kennedy</SelectItem>
                  <SelectItem value="Rogaciano">Rogaciano</SelectItem>
                </SelectContent>
              </Select>

              <Switch id="switch" />
              <Label htmlFor="switch">Exemplo de Switch</Label>
            </div>
          </div>
          <div className=" rounded-lg border p-4 shadow-lg">

            <h3 className=" mb-2 border-b text-lg leading-tight tracking-tighter">Data Table</h3>
            <DataTableDemo />
          </div>
        </div>
      </div>

    </section>
  );
}
