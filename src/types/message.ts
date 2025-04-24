export interface Message {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  status: "new" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}
