export type Comment = {
  id: number;
  content: string;
  commentState: "VISIBLE" | "HIDDEN";
  user: { name: string; lastName: string };
  createdAt: string;
  documentId: number;
};
