import { ProjectDescription } from "@/modules/main/components/project-details/ProjectDescription";
import { ProjectHeader } from "@/modules/main/components/project-details/ProjectHeader";
import { ProjectNotFound } from "@/modules/main/components/project-details/ProjectNotFound";
import { ProjectTasks } from "@/modules/main/components/project-details/ProjectTasks";
import { fetchProjectById } from "@/modules/projects/services/fetchProjectById";
import { redirect } from "@/modules/translations/i18n/routing";

interface ProjectDetailsProps {
  params: Promise<{ id: string; locale: string }>;
}

const ProjectDetails = async ({ params }: ProjectDetailsProps) => {
  const id = (await params).id;
  const locale = (await params).locale;

  const response = await fetch("http://localhost:3000/api/state-user").then(
    (res) => res.json()
  );

  if (!response?.message) return redirect({ href: "/dashboard", locale });

  const project = await fetchProjectById(id, response?.message);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectDescription project={project} />
      <ProjectTasks tasksIds={project.tasks} projectId={project.id} />
    </>
  );
};

export default ProjectDetails;
