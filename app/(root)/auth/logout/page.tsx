import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LogOutPage() {
  return (
    <div className="my-64 flex flex-col items-center">
      <h1 className="mb-4">
        Vous êtes connecté et pouvez intéragir avec les données.
      </h1>
      <form
        action={async () => {
          "use server";
          cookies().delete("session");
          revalidatePath("/");
          redirect("/");
        }}
      >
        <Button type="submit">Se déconnecter</Button>
      </form>
    </div>
  );
}
