export interface IComment {
  id: string;
  content: string;
  taskId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  mentions: string[];
}
