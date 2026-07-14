import api from "./api";

export type Document = {
  document_id: string;
  document_name: string;
  pages: number;
  chunks: number;
};

export async function getDocuments(): Promise<Document[]> {
  const response = await api.get("/documents/");
  return response.data;
}

export async function deleteDocument(id: string) {
  await api.delete(`/documents/${id}`);
}