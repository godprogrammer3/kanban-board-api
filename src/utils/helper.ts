import firestore from '@google-cloud/firestore';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const firebaseTimeStampToUtcString = function (
  timestamp: firestore.Timestamp,
): string {
  return dayjs(timestamp.toDate()).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
};
