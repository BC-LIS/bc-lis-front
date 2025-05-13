export const commentService = {
  async fetchByDocumentId(documentId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_COMMENTS}?documentId=${documentId}`
    );
    return res.json();
  },

  async add(content: string, documentId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_COMMENTS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, documentId }),
    });
    return res.json();
  },

  async updateContent(id: number, content: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_COMMENTS}/content`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, content }),
      }
    );
    return res.json();
  },

  async updateState(id: number, commentState: "VISIBLE" | "HIDDEN") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_COMMENTS}/state`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, commentState }),
      }
    );
    return res.json();
  },

  async delete(id: number) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL_COMMENTS}?id=${id}`, {
      method: "DELETE",
    });
  },
};
