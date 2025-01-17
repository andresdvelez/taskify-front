"use client";

import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import { addComment, removeComment } from "../../services/commentsService";
import { fetchUserById } from "../../services/fetchUserById";
import { IUser } from "@/types/user.interface";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { error } from "@/types/errors";

interface Comment {
  id: string;
  message: string;
  authorId: string;
  timestamp: Date;
}

interface CommentWithAuthor extends Omit<Comment, "authorId"> {
  author: IUser;
}

interface TaskCommentsProps {
  taskId: string;
  commentsApi: Comment[];
}

export const TaskComments = ({ taskId, commentsApi }: TaskCommentsProps) => {
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuthStore((state) => state.user);

  const enrichCommentsWithAuthors = async (commentsData: Comment[]) => {
    const enrichedComments = await Promise.all(
      commentsData.map(async (comment) => {
        const author = await fetchUserById(
          comment.authorId,
          user?.authToken as string
        );
        return {
          id: comment.id,
          message: comment.message,
          timestamp: comment.timestamp,
          author,
        };
      })
    );
    return enrichedComments;
  };

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const enrichedComments = await enrichCommentsWithAuthors(commentsApi);
        setComments(enrichedComments);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsApi]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const addedComment = await addComment(
          taskId,
          user?.id as string,
          newComment,
          user?.authToken as string
        );
        const author = await fetchUserById(
          addedComment.authorId,
          user?.authToken as string
        );
        const enrichedComment = {
          id: addedComment.id,
          message: addedComment.message,
          timestamp: addedComment.timestamp,
          author,
        };
        setComments([...comments, enrichedComment]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleDeleteCommit = async (
    taskId: string,
    commentId: string,
    token: string
  ) => {
    try {
      const deletedCommentId = await removeComment(taskId, commentId, token);
      if (deletedCommentId) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      toast.error((error as error).message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Comments</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg relative"
              >
                <Avatar
                  name={comment.author.firstName}
                  className="flex-shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {comment.author.firstName}
                  </p>
                  <p className="text-sm text-gray-600">{comment.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
                <Button
                  radius="full"
                  variant="light"
                  onPress={() =>
                    handleDeleteCommit(
                      taskId as string,
                      comment.id as string,
                      user?.authToken as string
                    )
                  }
                  className="text-red-400"
                  isIconOnly
                >
                  <i
                    className="icon-[proicons--delete]"
                    role="img"
                    aria-hidden="true"
                  ></i>
                </Button>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
          />
          <Button type="submit" color="primary" isDisabled={!newComment.trim()}>
            Add Comment
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
