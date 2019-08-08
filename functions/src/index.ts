import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as moment from 'moment';

// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore()

// export const getStats = functions.https.onRequest(async(request, response) => {
//    try {
//       const param = request.params.get('day')
//       console.log('param: ', param)
//       const snapshot = await db.collection('totalsByDate').doc(param).get()
//       const data = snapshot.data()
//       console.log('data: ', data)
//       response.send(data)
//    } catch (error) {
//       console.log('error: ', error)
//       response.status(500).send(error)
//    }
// })