export const getStatusColor = (
  status: string
): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
  switch (status) {
    case "completed":
      return "success";
    case "in_progress":
      return "warning";
    default:
      return "default";
  }
};

export const getPriorityColor = (
  priority: string
): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
  switch (priority) {
    case "high":
      return "danger";
    case "medium":
      return "warning";
    default:
      return "primary";
  }
};
