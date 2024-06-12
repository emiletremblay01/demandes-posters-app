"use client";
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
import { RequestActions } from "@/components/request-actions";

export function TabsContainer({
  posterRequests,
}: {
  posterRequests: PosterRequest[];
}) {
  const graphData = posterRequests.map((request) => {
    return {
      column: request.posterTitle,
      row: request.employeeName,
    };
  });
  const transformedData = graphData.reduce(
    (acc: { column: string; rows: string[] }[], current) => {
      // Find if there is already an object with the current column
      let found = acc.find((item) => item.column === current.column);

      if (found) {
        // If found, push the row into the rows array
        found.rows.push(current.row);
      } else {
        // If not found, create a new object with the current column and row
        acc.push({ column: current.column, rows: [current.row] });
      }

      return acc;
    },
    [],
  );
  return (
    <Tabs defaultValue="table" className="h-full w-full">
      <TabsList className="w-full">
        <TabsTrigger value="table" className="flex-1">
          Table
        </TabsTrigger>
        <TabsTrigger value="graph" className="flex-1">
          Graph
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table" className="">
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
              {posterRequests.map((request) => (
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
      </TabsContent>
      <TabsContent value="graph">
        <div className="flex w-full flex-wrap items-start gap-2">
          {transformedData.map((data) => (
            <div key={data.column} className="rounded border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">{data.column}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rows.map((row) => (
                    <TableRow key={row} className="p-0">
                      <TableCell className="px-4 py-2">{row}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
