import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

export const findDocuments = async <T>(collection: string): Promise<T[]> => {
  const docData = await admin.firestore().collection(collection).get();

  if (docData.empty) {
    return [] as T[];
  }

  return docData.docs.map((d) => d.data()) as T[];
};

export const setDocument = async <T>(
  collection: string,
  docID: string,
  data: Partial<T>
): Promise<void> => {
  await admin
    .firestore()
    .collection(collection)
    .doc(docID)
    .set(data, { merge: true });
};
