import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ITask } from "@/types/task.interface";
import { tasksColumns } from "@/data/taks-columns";
import { RenderCellTasks } from "./RenderCellTaks";

interface TasksTableProps {
  tasks: ITask[];
  projectId: string;
  onRowClick: (taskId: string) => void;
}

export const TasksTable = ({ tasks, onRowClick }: TasksTableProps) => (
  <Table aria-label="Project tasks table">
    <TableHeader>
      {tasksColumns.map((column) => (
        <TableColumn key={column.uid}>{column.name}</TableColumn>
      ))}
    </TableHeader>
    <TableBody
      emptyContent={
        tasks.length === 0 ? "No tasks found for this project." : undefined
      }
    >
      {tasks.map((task) => (
        <TableRow
          key={task.id}
          onClick={() => onRowClick(task.id)}
          className="hover:bg-black/5 transition-colors h-[50px] cursor-pointer group rounded-2xl"
        >
          {tasksColumns.map((column) => (
            <TableCell key={`${task.id}-${column.uid}`}>
              {RenderCellTasks(task, column.uid as keyof ITask)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
