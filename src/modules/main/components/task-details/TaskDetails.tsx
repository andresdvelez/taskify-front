import { formatDate } from "@/modules/common/utils/formatDate";
import { ITask } from "@/types/task.interface";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface TaskDetailsProps {
  task: ITask;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <h3>Task Details</h3>
      </CardHeader>
      <CardBody className="space-y-4">
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{task.description}</p>
        </div>
        <div>
          <h3 className="font-semibold">Project</h3>
          <p>{task.projectId}</p>
        </div>
        <div>
          <h3 className="font-semibold">Assigned To</h3>
          <p>{task.assignedTo.join(", ")}</p>
        </div>
        <div>
          <h3 className="font-semibold">Created By</h3>
          <p>{task.createdBy}</p>
        </div>
        <div>
          <h3 className="font-semibold">Deadline</h3>
          <p>{formatDate(task.deadline)}</p>
        </div>
      </CardBody>
    </Card>
  );
}
