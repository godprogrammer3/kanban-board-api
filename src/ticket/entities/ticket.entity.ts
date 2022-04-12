import firestore from '@google-cloud/firestore';
import { Collection } from 'fireorm';

@Collection('tickets')
export class Ticket {
  id!: string;
  title: string;
  description: string;
  status: TicketStatus;
  contact: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export enum TicketStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  RESOLVED = 'Resolved',
  REJECTED = 'Rejected',
}
