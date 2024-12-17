import { Schema, model, models } from 'mongoose';

interface Letter {
  id: string;
  email: string;
  name: string;
  content: string;
  reply: string;
  createdAt: Date;
}

const LetterSchema = new Schema<Letter>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LetterModel = models.Letters || model<Letter>('Letters', LetterSchema);

export { LetterModel };
export type { Letter };
