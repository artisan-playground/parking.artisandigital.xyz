const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// import * as firebase from '../Firebase'
const pkg = require('./package.json')
const version = pkg.version

const app = express()

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://parking.firebaseio.com',
})

//add other middleware
app.use(express.static('dist'))
app.use(express.static('images'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

app.get('/api/firebase/random', async (req, res) => {
  let docRef1 = db.collection(`X`).doc(`XX`)
  await docRef1.set({ hello: `world: ${new Date().getTime()}` })
  res.status(200).send('firebase !')
})

//List Car
var dataArr = []
app.get('/api/firebase/getCar', async (req, res) => {
  db.collection('User')
    .get()
    .then((querySnapshot) => {
      dataArr = []
      querySnapshot.forEach((doc) => {
        dataArr.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      res.status(200).send(dataArr)
    })
})

var imgUrl = ''
//Add Car
app.post('/api/firebase/add', async (req, res) => {
  // try {
  //   firebase.storage
  //     .ref(`images/${req.body.data.name}/${req.body.data.image.name}`)
  //     .putString(imageUrl, 'data_url')
  //     .then(function (snapshot) {
  //       firebase.storage
  //         .ref(`images/${uId}`)
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           imgUrl = url
  //         })
  //     })
  // } catch (error) {
  //   console.error(error)
  // }
  let docRef1 = db.collection(`User`).add({
    name: `${req.body.data.name}`,
    licensePlate: `${req.body.data.licensePlate}`,
    image: imgUrl,
  })
  res.status(200).send('Success')
})

app.get('/api', (req, res) => {
  res.status(200).send(`Welcome to webapp-starter api v${version}`)
})

app.get('/api/version', (req, res) => {
  res.status(200).send(`${version}`)
})

app.post('/api/line/webhook', require('./server.line.js').webhook)

const paths = app._router.stack.filter((v) => v.route).map((v) => v.route.path)

paths.forEach((path, idx) => {
  console.log(`[${idx}] -> ${path}`)
})

// console.log(process.env)
//start app
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`App is listening on port ${port}.`))
