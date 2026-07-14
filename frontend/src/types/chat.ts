export type Source = {
  document: string;
  page: number;
  score: number;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
};