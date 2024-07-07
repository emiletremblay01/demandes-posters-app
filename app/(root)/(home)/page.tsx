import { FormAddPosterRequest } from "@/components/form-add-poster-request";
import { SmoothCounter } from "@/components/smooth-counter";
import { TabsContainer } from "@/components/tabs-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllEmployees } from "@/data/employee";
import { getAllPosters } from "@/data/poster";
import { getAllPosterRequests } from "@/data/poster-request";
import { Suspense } from "react";

export default async function HomePage() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
  const posterRequests = await getAllPosterRequests();
  const numberOfPosterRequestsApproved = posterRequests.filter(
    (posterRequest) => posterRequest.isAccepted,
  ).length;
  return (
    <Suspense>
      <div className="container my-auto flex h-full flex-1 flex-col items-center py-4 lg:h-[800px] lg:max-h-[800px] lg:flex-row lg:items-stretch lg:gap-4">
        <div className="flex h-full flex-col gap-4">
          <FormAddPosterRequest {...{ employees, posters }} />
          <Card className="mt-8 hidden h-full w-full lg:mt-0 lg:block">
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-full flex-col items-center justify-center">
                <SmoothCounter count={numberOfPosterRequestsApproved} />
                <div className="text-muted-foreground">posters donnés</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8 h-fit w-full lg:mt-0 lg:h-full">
          <CardHeader>
            <CardTitle>Demandes</CardTitle>
            <CardDescription>Gérez vos demandes de poster.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-fit">
            <TabsContainer posterRequests={posterRequests} />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
