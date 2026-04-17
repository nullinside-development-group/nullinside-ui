import {ContactUsFeedbackComment} from './ContactUsFeedbackComment';

export interface ContactUsFeedback {
  id: number
  userId: number
  product: string
  message: string
  status: number
  timestamp: Date
  comments: ContactUsFeedbackComment[]
}
