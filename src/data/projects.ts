import { ProjectStatus } from "@/types/project.interface";

export const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description:
      "Complete overhaul of company website with modern UI/UX principles",
    tasks: [
      "Design new homepage",
      "Implement responsive layout",
      "Optimize images",
      "Update content management system",
    ],
    numberOfTasks: 12,
    status: ProjectStatus.ACTIVE,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Cross-platform mobile application for customer engagement",
    tasks: [
      "Setup React Native environment",
      "Implement user authentication",
      "Create main dashboard",
    ],
    numberOfTasks: 8,
    status: ProjectStatus.ON_HOLD,
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    name: "E-commerce Integration",
    description:
      "Integration of payment gateway and shopping cart functionality",
    tasks: [
      "Setup payment processor",
      "Design shopping cart flow",
      "Implement inventory management",
      "Create order tracking system",
    ],
    numberOfTasks: 15,
    status: ProjectStatus.ACTIVE,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-11"),
  },
  {
    id: "4",
    name: "Analytics Dashboard",
    description: "Real-time analytics dashboard for business metrics",
    tasks: [
      "Design dashboard layout",
      "Implement data visualization",
      "Create automated reports",
    ],
    numberOfTasks: 10,
    status: ProjectStatus.COMPLETED,
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "Legacy System Migration",
    description: "Migration of legacy database to new cloud infrastructure",
    tasks: [
      "Data mapping",
      "Create migration scripts",
      "Test data integrity",
      "Deploy to production",
    ],
    numberOfTasks: 18,
    status: ProjectStatus.ARCHIVED,
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2024-01-01"),
  },
];
