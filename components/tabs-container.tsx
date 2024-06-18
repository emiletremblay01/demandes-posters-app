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
import { DataTable } from "@/app/components/data-table";
import { columns } from "@/app/components/columns";

import type { PosterRequest } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";

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
      </TabsList>
      <TabsContent value="table" className="">
        <DataTable columns={columns} data={unapprovedPosterRequests} />
      </TabsContent>
      <TabsContent value="graph">
        <Card>
          <CardHeader>Nombres de posters reçus par employé</CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <BarChart data={uniqueGraphObjects} width={48} height={48}>
                <Tooltip
                  content={(props) => (
                    <div>
                      {props.payload &&
                        props.payload.map((item) => (
                          <div
                            key={item.name}
                            className="rounded-md bg-muted-foreground px-4 py-2 text-primary shadow-lg"
                          >
                            <p>
                              Posters reçus:{" "}
                              {item.payload.receivedPosters.length}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                />
                <YAxis allowDecimals={false} dataKey="numberOfPosterReceived" />
                <XAxis dataKey="employeeName" />
                <Bar
                  dataKey="numberOfPosterReceived"
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
    </Tabs>
  );
}
