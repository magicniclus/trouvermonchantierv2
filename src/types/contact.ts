export interface Contact {
  id: string;
  subject: string;
  content: string;
  status: "new" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  phone?: string;
}
