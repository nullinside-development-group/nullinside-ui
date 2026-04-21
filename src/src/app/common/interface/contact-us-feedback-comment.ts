export interface ContactUsFeedbackComment {
  id: number;
  userId: number;
  email: string | null;
  user: string;
  message: string;
  timestamp: Date
}
