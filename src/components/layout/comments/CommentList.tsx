import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { commentService } from "@/utils/CommentServices";
import { Comment } from "@/types/CommentTypes";
import { Button } from "@/components/ui/button";
import { CommentItem } from "@/components/layout/comments/CommentItem";

export const CommentList = ({ documentId }: { documentId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const data = await commentService.fetchByDocumentId(documentId);
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [documentId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await commentService.add(newComment, documentId);
    setNewComment("");
    fetchComments();
  };

  return (
    <div className="space-y-4 min-w-[32rem] mx-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment} variant="primary">
          Agregar Comentario
        </Button>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onRefresh={fetchComments}
          />
        ))}
      </div>
    </div>
  );
};
