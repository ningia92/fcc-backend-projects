require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
const PORT = process.env.PORT || 3000
const upload = multer({ dest: 'uploads/' })

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
