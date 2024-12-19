import { Schema, model, models } from 'mongoose';

interface EmailVerification {
  email: string;
  isVerified: boolean;
  createdAt: Date;
}

const EmailVerificationSchema = new Schema<EmailVerification>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const EmailVerificationModel =
  models.EmailVerifications ||
  model<EmailVerification>('EmailVerifications', EmailVerificationSchema);

export { EmailVerificationModel };
export type { EmailVerification };
