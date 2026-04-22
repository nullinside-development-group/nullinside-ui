import {ContactUsFeedbackComment} from './contact-us-feedback-comment';
import {ContactUsFeedbackStatus} from './contact-us-feedback-status';

export interface ContactUsFeedback {
  id: number;
  email: string | null;
  userId: number;
  product: string;
  message: string;
  status: ContactUsFeedbackStatus;
  timestamp: Date;
  isRead: boolean;
  comments: ContactUsFeedbackComment[];
}
