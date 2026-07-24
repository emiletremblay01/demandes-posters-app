"use client";
import { RequestActions } from "@/components/request-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "@/components/datatable/columns";

import type { PosterRequest } from "@/lib/types";
import { ChartPosters } from "./chart-posters";

export function TabsContainer({
  posterRequests,
}: {
  posterRequests: PosterRequest[];
}) {
  const approvedPosterRequests = posterRequests.filter(
    (posterRequest) => posterRequest.isAccepted,
  );

  const unapprovedPosterRequests = posterRequests.filter(
    (posterRequest) => !posterRequest.isAccepted,
  );

  type GraphObject = {
    employeeName: string;
    receivedPosters: string[];
    numberOfPosterReceived: number;
  };
  const graphObjects: GraphObject[] = approvedPosterRequests.map(
    (posterRequest) => {
      const receivedPosters = approvedPosterRequests
        .filter((pr) => pr.employeeName === posterRequest.employeeName)
        .map((pr) => pr.posterTitle);
      return {
        employeeName: posterRequest.employeeName,
        numberOfPosterReceived: receivedPosters.length,
        receivedPosters: receivedPosters,
      };
    },
  );
  // remove duplicates from graphObjects
  const uniqueGraphObjects = graphObjects.filter(
    (graphObject, index, self) =>
      index ===
      self.findIndex((t) => t.employeeName === graphObject.employeeName),
  );

  // sort by number of posters received
  uniqueGraphObjects.sort(
    (a, b) => b.numberOfPosterReceived - a.numberOfPosterReceived,
  );
  
  const groupedPosters: Record<string, number> = unapprovedPosterRequests.reduce(
  (acc, request) => {
    const title = request.posterTitle;
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
  );
  
  return (
    <Tabs defaultValue="table" className="w-full">
      <TabsList className="mb-2 w-full">
        <TabsTrigger value="table" className="flex-1">
          Table
        </TabsTrigger>
        <TabsTrigger value="graph" className="flex-1">
          Graphique
        </TabsTrigger>
        <TabsTrigger value="historique" className="flex-1">
          Historique
        </TabsTrigger>
        <TabsTrigger value="liste" className="flex-1">
          Liste
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table" className="">
        <DataTable columns={columns} data={unapprovedPosterRequests} />
      </TabsContent>
      <TabsContent value="graph">
        <ChartPosters data={uniqueGraphObjects} />
      </TabsContent>
      <TabsContent value="historique" className="">
        <ScrollArea className="h-[500px] w-full">
          <div className="h-full w-full overflow-auto rounded border">
            <Table className="h-full w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Équipier</TableHead>
                  <TableHead>Poster</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedPosterRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="py-2">
                      {request.employeeName}
                    </TableCell>
                    <TableCell className="py-2">
                      {request.posterTitle}
                    </TableCell>
                    <TableCell className="py-2">
                      <RequestActions request={request} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="liste" className="">
        <Table className="h-full w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Poster</TableHead>
                  <TableHead>Quantité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedPosters).map(([posterTitle, qty]) => (
                  <TableRow key={posterTitle}>
                    <TableCell className="py-2">{posterTitle}</TableCell>
                    <TableCell className="py-2">{qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
