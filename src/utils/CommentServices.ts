export const commentService = {
  async fetchByDocumentId(documentId: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_COMMENTS}?documentId=${documentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("session")}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      throw error;
    }
  },

  async add(content: string, documentId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_COMMENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
      body: JSON.stringify({ content, documentId }),
    });
    return res.json();
  },

  async updateContent(id: number, content: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_COMMENTS}/content`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
        body: JSON.stringify({ id, commentState }),
      }
    );
    return res.json();
  },

  async delete(id: number) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL_COMMENTS}?commentId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
  },
};
