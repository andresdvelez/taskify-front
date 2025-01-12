import { IProject } from "@/types/project.interface";

export const createProject = async (
  projectData: Partial<IProject>
): Promise<IProject> => {
  // TODO: Implement API call
  // const response = await fetch('/api/projects', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(projectData),
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to create project');
  // }

  // return response.json();

  return {
    ...projectData,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: [],
  } as IProject;
};
