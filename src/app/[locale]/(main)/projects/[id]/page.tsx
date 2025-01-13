import { projects } from "@/data/projects";
import { ProjectDescription } from "@/modules/main/components/project-details/ProjectDescription";
import { ProjectHeader } from "@/modules/main/components/project-details/ProjectHeader";
import { ProjectNotFound } from "@/modules/main/components/project-details/ProjectNotFound";
import { ProjectTasks } from "@/modules/main/components/project-details/ProjectTasks";

interface ProjectDetailsProps {
  params: Promise<{ id: string }>;
}

const ProjectDetails = async ({ params }: ProjectDetailsProps) => {
  const id = (await params).id;

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectDescription project={project} />
      <ProjectTasks projectId={project.id} />
    </>
  );
};

export default ProjectDetails;
