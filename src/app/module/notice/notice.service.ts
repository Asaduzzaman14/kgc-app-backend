import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { INotice } from './notice.interface';
import { Notice } from './notice.models';

import admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import serviceAccount from '../../../../khagrachari-plus-firebase-adminsdk-nd991-add1394905.json';

// const admin = require('firebase-admin');

const create = async (data: INotice): Promise<INotice | null> => {
  const isExist = await Notice.find({});

  if (isExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Notise already exist');
  }

  const result = await Notice.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Post notice');
  }

  return result;
};

const getAllData = async (): Promise<INotice[]> => {
  const result = await Notice.find({
    status: 'active',
  });
  console.log(result);

  return result;
};

const getAllDataForAdmin = async (): Promise<INotice[]> => {
  const result = await Notice.find({});
  console.log(result);

  return result;
};

const getSingleData = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: INotice
): Promise<INotice | null> => {
  const result = await Notice.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findByIdAndDelete(id);
  return result;
};

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const testNotifaction = async () => {
  console.log(process.env.FIREBASE_SERVICE_ACCOUNT_KEY); // success fully logged

  const userTokens = [
    'fUwGnpwtTNam2Cq4LMxYos:APA91bF8cuFwWOLPJV2f2-HlCtC6q0mopSB3QGeSJYzwKI9mnEMviKrSM7_zpdTTtub2xk24LRVaXiUQFQ9LfH_WM09uSjNpvygBSTFPMbL6aEsO5-bba91Q1Ykn0k6EY195lbCWJOQp',
  ];

  // Create notification payload

  // Create notification payload
  const payload = {
    token: userTokens[0],
    notification: {
      title: 'Service Approved',
      body: 'আপনার সেবাটি অ্যাপ্রুভ করা হয়েছে। নির্দিষ্ট সেবাতে গিয়ে চেক করে দেখুন।',
    },
  };

  try {
    const response = await admin.messaging().send(payload);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  getAllDataForAdmin,
  updateDataById,
  deleteData,
  testNotifaction,
};
