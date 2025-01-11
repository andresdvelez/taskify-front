export interface CreateCommentDto {
  content: string;
  taskId: string;
  mentions?: string[];
}

export interface UpdateCommentDto {
  content?: string;
  mentions?: string[];
}
