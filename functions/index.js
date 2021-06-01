const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const REGION = 'europe-west1'
const SEEDS = require('./seeds')

exports.logger = functions.region(REGION).https.onCall((data, context) => {
  const {message, payload, level} = data;
  if (level === "error") {
    functions.logger.error(message, payload);
  } else {
    functions.logger.info(message, payload);
  }
});

exports.seedData = functions.region(REGION).https.onRequest(async (req,resp) => {
  for (const seed of SEEDS.SEED_DATA) {
    for (const doc of seed.data) {
     if (doc.key) {
       await admin.firestore().collection(seed.collection).doc(doc.key).set({...doc.data})
     } else {
       await admin.firestore().collection(seed.collection).add({...doc.data})
     }
    }
  }
  resp.json({status: 200})
});

