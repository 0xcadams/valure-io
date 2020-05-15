import * as mongoose from 'mongoose';

export interface ISupportRequest {
  issue: string;
  type: 'support' | 'feedback';
  email: string;
}

const supportRequestSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      index: true
    },
    type: {
      type: String,
      index: true
    },
    email: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

const v1SupportRequestModel = mongoose.model<
  ISupportRequest & mongoose.Document
>('SupportRequest', supportRequestSchema);

export { v1SupportRequestModel };
