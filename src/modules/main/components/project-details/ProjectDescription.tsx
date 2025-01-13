import { IProject } from "@/types/project.interface";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface ProjectDescriptionProps {
  project: IProject;
}

export const ProjectDescription = ({ project }: ProjectDescriptionProps) => {
  return (
    <Card shadow="none" className="mb-6">
      <CardHeader>
        <h3>Project Description</h3>
      </CardHeader>
      <CardBody>
        <p>{project.description}</p>
        <div className="mt-4">
          <strong>Number of Tasks:</strong> {project.numberOfTasks}
        </div>
      </CardBody>
    </Card>
  );
};
