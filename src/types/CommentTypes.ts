export type Comment = {
  id: number;
  content: string;
  commentState: "VISIBLE" | "HIDDEN";
  user: { name: string; lastName: string; username: string };
  createdAt: string;
  documentId: number;
};
