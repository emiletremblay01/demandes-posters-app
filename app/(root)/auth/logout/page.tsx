import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function LogOutPage() {
  return (
    <div className="my-64 flex flex-col items-center">
      <h1 className="mb-4">
        Vous êtes connecté et pouvez intéragir avec les données.
      </h1>
      <form
        className=""
        action={async () => {
          "use server";
          try {
            cookies().delete("nip");
          } catch (error) {
            console.error(error);
          } finally {
            revalidatePath("/");
            redirect("/");
          }
        }}
      >
        <Button type="submit">Se déconnecter</Button>
      </form>
    </div>
  );
}
