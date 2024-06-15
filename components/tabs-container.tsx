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
import type { PosterRequest } from "@prisma/client";

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

  const postersWithRequests: {
    column: string;
    rows: PosterRequest[];
  }[] = [];

  for (const request of unapprovedPosterRequests) {
    const poster = postersWithRequests.find(
      (poster) => poster.column === request.posterTitle,
    );
    if (poster) {
      poster.rows.push(request);
    } else {
      postersWithRequests.push({
        column: request.posterTitle,
        rows: [request],
      });
    }
  }

  return (
    <Tabs defaultValue="table" className="h-full w-full">
      <TabsList className="mb-2 w-full">
        <TabsTrigger value="table" className="flex-1">
          Par demandes
        </TabsTrigger>
        <TabsTrigger value="graph" className="flex-1">
          Par posters
        </TabsTrigger>
        <TabsTrigger value="historique" className="flex-1">
          Historique
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table" className="">
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
                {unapprovedPosterRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.posterTitle}</TableCell>
                    <TableCell>
                      <RequestActions request={request} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="graph">
        <ScrollArea className="h-[500px] w-full">
          <div className="flex w-full flex-wrap items-start gap-4">
            {postersWithRequests.map((data) => (
              <div key={data.column} className="w-40 truncate rounded border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">{data.column}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="group relative flex w-full items-center p-0 px-4">
                          <div className="flex-1 truncate py-2 opacity-100 transition group-hover:opacity-0">
                            {row.employeeName}
                          </div>
                          <div className="absolute left-0 flex w-full justify-center opacity-0 transition group-hover:opacity-100">
                            <RequestActions request={row} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </ScrollArea>
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
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.posterTitle}</TableCell>
                    <TableCell>
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
