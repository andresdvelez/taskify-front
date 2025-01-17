import { TaskFilters, TaskPriority, TaskStatus } from "@/types/task.interface";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  SharedSelection,
} from "@nextui-org/react";

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: Partial<TaskFilters>) => void;
  onClearFilters: () => void;
}

export const TaskFiltersComponent = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <Input
        placeholder="Search tasks..."
        value={filters.search || ""}
        onChange={(e) => onFiltersChange({ search: e.target.value })}
        className="w-64"
        size="sm"
      />

      <Dropdown>
        <DropdownTrigger variant="bordered" size="sm">
          <Button>Status: {filters.status || "All"}</Button>
        </DropdownTrigger>
        <DropdownMenu
          selectionMode="single"
          selectedKeys={filters.status ? [filters.status] : []}
          onSelectionChange={(keys: SharedSelection) => {
            const selected = Array.from(keys)[0] as TaskStatus;
            onFiltersChange({ status: selected || undefined });
          }}
        >
          <DropdownItem key="all">All</DropdownItem>
          <>
            {Object.values(TaskStatus).map((status) => (
              <DropdownItem key={status}>{status}</DropdownItem>
            ))}
          </>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" size="sm">
            Priority: {filters.priority || "All"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          selectionMode="single"
          selectedKeys={filters.priority ? [filters.priority] : []}
          onSelectionChange={(keys: SharedSelection) => {
            const selected = Array.from(keys)[0] as TaskPriority;
            onFiltersChange({ priority: selected || undefined });
          }}
        >
          <DropdownItem key="all">All</DropdownItem>
          <>
            {Object.values(TaskPriority).map((priority) => (
              <DropdownItem key={priority}>{priority}</DropdownItem>
            ))}
          </>
        </DropdownMenu>
      </Dropdown>

      <Input
        type="date"
        label="Start Date"
        value={filters.deadlineStart || ""}
        onChange={(e) => onFiltersChange({ deadlineStart: e.target.value })}
        size="sm"
      />

      <Input
        type="date"
        label="End Date"
        value={filters.deadlineEnd || ""}
        onChange={(e) => onFiltersChange({ deadlineEnd: e.target.value })}
        size="sm"
      />

      <Button size="sm" variant="bordered" onPress={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};
