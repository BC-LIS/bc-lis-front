import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/CommentTypes";
import { commentService } from "@/utils/CommentServices";
import React, { useState } from "react";

export const CommentItem = ({
  comment,
  onRefresh,
}: {
  comment: Comment;
  onRefresh: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleUpdate = async () => {
    await commentService.updateContent(comment.id, editedContent);
    setIsEditing(false);
    onRefresh();
  };

  return (
    <div className="border rounded p-4 space-y-2 bg-slate-200 dark:bg-gray-900">
      <p className="text-sm text-gray-500">
        {comment.user.name} {comment.user.lastName} -{" "}
        {new Date(comment.createdAt).toLocaleDateString()}:
      </p>
      {isEditing ? (
        <>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <Button onClick={handleUpdate}>Guardar</Button>
          <Button onClick={() => setIsEditing(false)} variant="destructive">
            Cancelar
          </Button>
        </>
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: comment.content }}
            className="prose dark:prose-invert"
          />
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
            <Button
              onClick={async () => {
                await commentService.delete(comment.id);
                onRefresh();
              }}
              variant="destructive"
            >
              Eliminar
            </Button>
            <Button
              onClick={async () => {
                await commentService.updateState(
                  comment.id,
                  comment.commentState === "VISIBLE" ? "HIDDEN" : "VISIBLE"
                );
                onRefresh();
              }}
              variant="secondary"
            >
              {comment.commentState === "VISIBLE" ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
