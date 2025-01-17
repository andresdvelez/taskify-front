import { TaskComments } from "@/modules/main/components/task-details/TaskComments";
import { TaskDetails } from "@/modules/main/components/task-details/TaskDetails";
import { TaskHeader } from "@/modules/main/components/task-details/TaskHeader";
import { fetchTask } from "@/modules/projects/services/fetchTasks";
import { redirect } from "@/modules/translations/i18n/routing";

interface TaskPageProps {
  params: Promise<{ taskId: string; locale: string }>;
}

const TaskPage = async ({ params }: TaskPageProps) => {
  const taskId = (await params).taskId;
  const locale = (await params).locale;

  const task = await fetchTask(taskId);

  if (!task) {
    redirect({ href: "/", locale });
  }

  return (
    <>
      <TaskHeader task={task} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TaskDetails task={task} />
        </div>
        <div>
          <TaskComments taskId={task.id} commentsApi={task.comments} />
        </div>
      </div>
    </>
  );
};

export default TaskPage;
