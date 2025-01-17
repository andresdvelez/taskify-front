"use client";

import { columns } from "@/data/projects-columns";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { RenderCell } from "./RenderCell";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useProjectStore } from "@/store/projects-store";
import { useAuthStore } from "@/store/auth-store";
import { UserRole } from "@/types/user.interface";

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export const ProjectsTable = () => {
  const projects = useProjectStore((state) => state.projects);
  const isLoading = useProjectStore((state) => state.isLoading);

  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

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
      <TableBody items={projects || []}>
        {(item) => (
          <TableRow
            onClick={() => router.push(`/projects/${item.id}`)}
            className="hover:bg-black/5 transition-colors h-[50px] cursor-pointer group rounded-2xl"
            key={item.id}
          >
            {(columnKey) => (
              <TableCell>
                {RenderCell(item, columnKey, user?.role as UserRole)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
