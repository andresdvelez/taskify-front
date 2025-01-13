"use client";

import { projects } from "@/data/projects";
import { columns } from "@/data/projects-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { RenderCell } from "./RenderCell";
import { useRouter } from "@/modules/translations/i18n/routing";

export interface Project {
  id: string;
  name: string;
  numberOfTasks: number;
  createdAt: string;
}

export const ProjectsTable = () => {
  const router = useRouter();

  return (
    <Table
      aria-label="Projects table"
      classNames={{
        wrapper: "min-h-[400px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={projects}>
        {(item) => (
          <TableRow
            onClick={() => router.push(`/projects/${item.id}`)}
            className="hover:bg-black/5 transition-colors h-[50px] cursor-pointer group rounded-2xl"
            key={item.id}
          >
            {(columnKey) => (
              <TableCell>{RenderCell(item, columnKey).toString()}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
