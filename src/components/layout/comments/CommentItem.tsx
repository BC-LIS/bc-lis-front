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
    <div className="border rounded p-4 space-y-2 my-4 w-full">
      <p className="text-sm text-accent-foreground font-bold">
        {comment.user.name} {comment.user.lastName} -{" "}
        {new Date(comment.createdAt).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
        :
      </p>
      {isEditing ? (
        <>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="resize-none w-full"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleUpdate}>Guardar</Button>
            <Button onClick={() => setIsEditing(false)} variant="destructive">
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: comment.content }}
            className="prose dark:prose-invert"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="secondary"
              className="hover:scale-105 transition-transform"
            >
              Editar
            </Button>
            <Button
              onClick={async () => {
                await commentService.delete(comment.id);
                onRefresh();
              }}
              variant="destructive"
              className="hover:scale-105 transition-transform"
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
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              {comment.commentState === "VISIBLE" ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
