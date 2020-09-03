const request = require('request')
var moment = require('moment')
var randomstring = require('randomstring')
const fs = require('fs')
const line = require('@line/bot-sdk')
const imageDir = 'images/'

const lineToken = {
  channelAccessToken: process.env.channelAccessToken || 'fixme',
  channelSecret: process.env.channelSecret || 'fixme',
}

const line_client = new line.Client(lineToken)
const vision = require('@google-cloud/vision')
const vision_client = new vision.ImageAnnotatorClient()
const fn = {}

// app.get('/image', function (req, res) {
//   var z = currentImage.toString('base64')
//   res.send(z)
// })

fn.webhook = (req, res) =>
  Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))

const handleEvent = (event) => {
  console.log(event)
  if (event.type === 'message' && event.message.type === 'text') {
    return Promise.resolve(event.message.text)
    handleMessageEvent(event)
  } else if (event.type === 'message' && event.message.type === 'image') {
    handleImageEvent(event)
  } else {
    return Promise.resolve(null)
  }
}

const handleImageEvent = (event) => {
  var message = event.message
  console.log(message)
  var chunks = []
  line_client.getMessageContent(message.id).then((stream) => {
    stream.on('data', (chunk) => {
      chunks.push(chunk)
      // console.log(chunks);
    })

    stream.on('end', async () => {
      var body = Buffer.concat(chunks)

      var msg = {
        type: 'text',
        text: 'อ่านรูปแล้วนะ กำลังส่งไปปริ้นแหล่ะ',
      }
      currentImage = body

      const messageSend = [msg]
      const string_data = body.toString('base64')
      messageSend.push(msg)
      const dataUri = string_data
      const data = dataUri.replace(/^data:image\/\w+;base64,/, '')
      const buf = new Buffer(data, 'base64')

      let imageName = moment(new Date()).format('YYYY-MM-DD_HH_MM_SS_SSS')
      imageName += randomstring.generate(4) + '.png'

      fs.writeFileSync(imageDir + imageName, buf)
      const request = {
        // image: {content: fs.readFileSync(fileName)},
        image: { content: buf },
      }

      const [result] = await vision_client.objectLocalization(request)
      const texts = result.textAnnotations
      const objects = result.localizedObjectAnnotations
      objects.forEach((object) => {
        console.log(`Name: ${object.name}`)
        console.log(`Confidence: ${object.score}`)
        const vertices = object.boundingPoly.normalizedVertices
        vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`))
      })
      texts.forEach((object) => {
        console.log(`text: ${object}`)
      })
      return line_client.replyMessage(event.replyToken, {
        type: 'text',
        text: JSON.stringify(objects),
      })
    })

    stream.on('error', (err) => {
      // error handling
    })
  })
}

function handleMessageEvent(event) {
  var msg = {
    type: 'text',
    text: 'ส่งรูปมาเลยจ้า',
  }

  if (event.message.text == 'Firer') {
  }

  return line_client.replyMessage(event.replyToken, msg)
}

module.exports = fn
