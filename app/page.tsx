import { Combobox } from "@/components/combobox";
import { getAllEmployees } from "@/data/employee";
import { getAllPosters } from "@/data/poster";

export default async function Home() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
  return (
    <div className="container">
      <div className="flex">
        <Combobox data={employees} placeholder="Choisir Équipier..." />
        <div className="w-4"></div>
        <Combobox data={posters} placeholder="Choisir Poster..." />
      </div>
    </div>
  );
}
