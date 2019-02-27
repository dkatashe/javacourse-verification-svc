const express = require('express')
const app = express()
const rnd = require('randomstring')

require('dotenv').load()

app.get('/get-verification-code', (req, res) => {
  res.set('Content-Type', 'text/plain;charset=UTF-8')
  res.status(200).send('Hello, I am verification service! To get your verification code please provide an id: ' +
    ':/get-verification-code/{your-number-id}')
})

app.get('/get-verification-code/:id', (req, res) => {
  res.set('Content-Type', 'text/plain;charset=UTF-8')
  const id = req.params['id']

  if (/^\d+$/.test(id)) {
    const verifCode = rnd.generate({
      length: 18,
      capitalization: 'uppercase'
    })

    res.status(200).send('For your id \'' + req.params['id'] + '\' verification code is: ' + verifCode)
  } else {
    res.status(400).send('Error: \'id\' should be numeric')
  }
})

app.listen(process.env.VERIF_SVC_PORT, () => {
  console.log('Service is listening to incoming requests from port ' + process.env.VERIF_SVC_PORT)
})