import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

interface Comment {
  id: string;
  message: string;
  authorId: string;
  timestamp: Date;
}

export const addComment = async (
  taskId: string,
  userId: string,
  message: string,
  token: string
): Promise<Comment> => {
  try {
    const { data: newComment } = await axios.post(
      `${BACKEND_URL}/tasks/add-comment`,
      {
        taskId,
        userId,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return newComment;
  } catch (error) {
    throw error;
  }
};

export const removeComment = async (
  taskId: string,
  commentId: string,
  token: string
): Promise<Comment> => {
  try {
    const { data: deletedCommentId } = await axios.post(
      `${BACKEND_URL}/tasks/remove-comment`,
      {
        taskId,
        commentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return deletedCommentId;
  } catch (error) {
    throw error;
  }
};
