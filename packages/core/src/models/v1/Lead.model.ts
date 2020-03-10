import * as mongoose from 'mongoose';

export interface ILead {
  email: string;
  address?: string;
  city?: string;
}

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },
    address: {
      type: String,
      index: true
    },
    city: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

const v1LeadModel = mongoose.model<ILead & mongoose.Document>(
  'Lead',
  leadSchema
);

export { v1LeadModel };
