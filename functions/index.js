const ramda = require('ramda')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const REGION = 'europe-west1'
const SEEDS = require('./seeds')
const AWARD_TYPE_COUPON = "coupon";
const AWARD_TYPE_PRIZE = "prize";

exports.logger = functions.region(REGION).https.onCall((data, context) => {
  const { message, payload, level } = data
  if (level === 'error') {
    functions.logger.error(message, payload)
  } else {
    functions.logger.info(message, payload)
  }
})

exports.seedData = functions.region(REGION).https.onRequest(async (req, resp) => {
  for (const seed of SEEDS.SEED_DATA) {
    for (const doc of seed.data) {
      if (doc.key) {
        await admin.firestore().collection(seed.collection).doc(doc.key).set({ ...doc.data })
      } else {
        await admin.firestore().collection(seed.collection).add({ ...doc.data })
      }
    }
  }
  resp.json({ status: 200 })
})

exports.onOrderUpdate = functions.region(REGION).firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const data = change.after.data()
    const prevData = change.before.data()
    let points = data.points

    if (!points) {
      const config = await admin.remoteConfig().getTemplate()
      points = ramda.pathOr(100, ['parameters', 'defaultOrderPoints', 'defaultValue', 'value'], config)
    }
    if (prevData.status !== 'withRating' && data.status === 'withRating') {
      await admin.firestore().collection('transactions').add({
        order: change.after.ref,
        user: data.user,
        points,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      })
    }
    return change
  })

exports.onBookingCreate = functions.region(REGION).firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap) => {
    const data = snap.data()
    const award = (await data.award.get()).data()
    await admin.firestore().collection('transactions').add({
      booking: snap.ref,
      user: data.user,
      points: -ramda.propOr(0, 'points', award),
      stars: -ramda.propOr(0, 'stars', award),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
    return snap
  })

exports.onTransactionWrite = functions.region(REGION).firestore
  .document('transactions/{transactionId}')
  .onWrite(async (change) => {
    const data = change.after.data()
    const transactions = await admin.firestore().collection('transactions').where('user', '==', data.user).get()
    const sumPoints = ramda.sum(transactions.docs.map((item) => ramda.propOr(0, 'points', item.data())))
    const sumStars = ramda.sum(transactions.docs.map((item) => ramda.propOr(0, 'stars', item.data())))
    await data.user.update({ points: sumPoints, stars: sumStars })
    return change
  })

exports.onCreateUser = functions.region(REGION).auth.user().onCreate(async (user) => {
  await admin.firestore().collection('users').doc(user.uid).set({ stars: 1, points: 0 })
  return user
})

exports.everyDay = functions.region(REGION).pubsub.schedule('every 1 days').onRun(async (context) => {
  const config = await admin.remoteConfig().getTemplate()
  const maxUserStars = ramda.path(['parameters', 'maxUserStars', 'defaultValue', 'value'], config)
  const users = await admin.firestore().collection('users').where('stars', '<', parseInt(maxUserStars)).get()
  await users.docs.map(async user => await admin.firestore().collection('transactions').add({
      user: user.ref,
      stars: 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
  )
})

