// // lib/firebaseAdmin.js
// import * as admin from 'firebase-admin';

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//         "type": "service_account",
//         project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//         private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
//         private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n'),
//         client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
//         client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40datahub-224bd.iam.gserviceaccount.com",
//         "universe_domain": "googleapis.com"
//       }),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
// }

// const auth = admin.auth();

// export { auth, admin };
