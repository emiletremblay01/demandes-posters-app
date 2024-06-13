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

export default async function Home() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
  const posterRequests = await getAllPosterRequests();
  const numberOfPosterRequestsApproved = posterRequests.filter(
    (posterRequest) => posterRequest.isAccepted,
  ).length;
  return (
    <Suspense>
      <div className="container flex h-full flex-col items-center py-20 lg:flex-row lg:items-start lg:gap-4">
        <div className="flex h-full flex-col gap-4">
          <FormAddPosterRequest {...{ employees, posters }} />
          <Card className="mt-8 h-full w-full lg:mt-0">
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <SmoothCounter count={numberOfPosterRequestsApproved} />
                <div className="text-muted-foreground"> posters donnés</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 h-full w-full lg:mt-0">
          <CardHeader>
            <CardTitle>Demandes</CardTitle>
            <CardDescription>Gérez vos demandes de poster.</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <TabsContainer posterRequests={posterRequests} />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
