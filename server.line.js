const request = require('request')
const line = require('@line/bot-sdk')

const lineToken = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
}

const client = new line.Client(lineToken)

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
    return Promise.resolve(null)
    handleMessageEvent(event)
  } else if (event.type === 'message' && event.message.type === 'image') {
    handleImageEvent(event)
  } else {
    return Promise.resolve(null)
  }
}

const handleImageEvent = (event) => {
  var message = event.message
  var chunks = []
  client.getMessageContent(message.id).then((stream) => {
    stream.on('data', (chunk) => {
      chunks.push(chunk)
      // console.log(chunks);
    })

    stream.on('end', () => {
      var body = Buffer.concat(chunks)

      var msg = {
        type: 'text',
        text: 'อ่านรูปแล้วนะ กำลังส่งไปปริ้นแหล่ะ',
      }
      currentImage = body

      const messageSend = [msg]
      const string_data = body.toString('base64')
      messageSend.push(msg)
      console.log(string_data)
      const readingMessage = {
        type: 'text',
        text: 'ปริ้นรูปแล้วน้าา',
      }
      return client.replyMessage(event.replyToken, readingMessage)

      //   request.post(
      //     printUrl,
      //     { form: { image_64: string_data } },

      //     function (err, httpResponse, body) {
      //       var readingMessage = {
      //         type: 'text',
      //         text: 'ปริ้นรูปแล้วน้าา',
      //       }

      //       var errorMessage = {
      //         type: 'text',
      //         text: 'เหมือนจะปริ้นไม่ไ้ดนะ',
      //       }

      //       if (!err) {
      //         messageSend.push(readingMessage)
      //         return client.replyMessage(event.replyToken, messageSend)
      //       } else {
      //         messageSend.push(errorMessage)
      //         return client.replyMessage(event.replyToken, messageSend)
      //       }
      //     }
      //   )
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

  return client.replyMessage(event.replyToken, msg)
}

module.exports = fn
