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

export interface Project {
  id: string;
  name: string;
  numberOfTasks: number;
  createdAt: string;
}

export const ProjectsTable = () => {
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
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{RenderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
