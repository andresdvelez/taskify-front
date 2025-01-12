export const getPageTitle = (pathname: string) => {
  const path = pathname.split("/")[1];

  const titles: { [key: string]: string } = {
    "": "Dashboard", // Home route
    dashboard: "Dashboard",
    projects: "Projects",
    team: "Team",
  };

  return titles[path] || "Dashboard";
};

export const getPageDescription = (pathname: string) => {
  const descriptions: { [key: string]: string } = {
    "": "Monitor, Evaluate & Enhance your performance",
    dashboard: "Monitor, Evaluate & Enhance your performance",
    projects: "Manage and track your ongoing projects",
    team: "Collaborate with your team members",
  };

  const path = pathname.split("/")[1];
  return descriptions[path] || "Monitor, Evaluate & Enhance your performance";
};
