const request = require('request')
var moment = require('moment')
var randomstring = require('randomstring')
const fs = require('fs')
const line = require('@line/bot-sdk')
const imageDir = 'images/'

let baseUrl = process.env.baseUrl || 'https://parking.artisandigital.tech'
const lineToken = {
  channelAccessToken: process.env.channelAccessToken || 'fixme',
  channelSecret: process.env.channelSecret || 'fixme',
}

console.log(lineToken)

const line_client = new line.Client(lineToken)
const vision = require('@google-cloud/vision')
const vision_client = new vision.ImageAnnotatorClient()
const jimp = require('jimp')
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

      const messageSend = []
      const string_data = body.toString('base64')
      const dataUri = string_data
      const data = dataUri.replace(/^data:image\/\w+;base64,/, '')
      const buf = new Buffer(data, 'base64')

      let imageName = moment(new Date()).format('YYYY-MM-DD_HH_MM_SS_SSS')
      imageName += randomstring.generate(4) + '.png'

      fs.writeFileSync(imageDir + imageName, buf)
      const object_request = {
        image: { content: buf },
      }

      const [result] = await vision_client.objectLocalization(object_request)
      const objects = result.localizedObjectAnnotations

      jimp.read(buf, async (err, image) => {
        if (err) throw err
        else {
          //crop
          const license_obj = objects.find((x) => x.name === 'License plate')
          const license_vertices = license_obj.boundingPoly.normalizedVertices
          const x = license_vertices[0].x * image.bitmap.width
          const y = license_vertices[0].y * image.bitmap.height
          const w = Math.abs(
            license_vertices[2].x * image.bitmap.width - license_vertices[0].x * image.bitmap.width
          )
          const h = Math.abs(
            license_vertices[2].y * image.bitmap.height -
              license_vertices[0].y * image.bitmap.height
          )

          const buf = await image.crop(x, y, w, h).getBufferAsync(jimp.MIME_PNG)
          image.write(`${imageDir}/cropped_/${imageName}`)
          // image.write("")
          // image.crop(x, y, w, h).write(`${imageDir}/cropped_/${imageName}`)
          const text_request = {
            image: {
              content: buf,
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION',
              },
            ],
            imageContext: {
              languageHints: ['th'],
            },
          }

          const [text_results] = await vision_client.annotateImage(text_request)
          const texts = text_results.textAnnotations

          // objects.forEach((object) => {
          //   console.log(`Name: ${object.name}`)
          //   console.log(`Confidence: ${object.score}`)
          //   const vertices = object.boundingPoly.normalizedVertices
          //   vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`))
          // })
          console.log(text_results)
          messageSend.push({
            type: 'image',
            originalContentUrl: `${baseUrl}/cropped_/${imageName}`,
            previewImageUrl: `${baseUrl}/cropped_/${imageName}`,
            animated: false,
          })

          messageSend.push({
            type: 'text',
            text: text_results.textAnnotations[0].description.split('\n').join('\n'),
          })
          return line_client.replyMessage(event.replyToken, messageSend)
        }
        // .then()
        // .write(imageDir + 'cropped_' + imageName)
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
