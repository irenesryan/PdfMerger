const express = require('express')
const path = require('path')
const multer = require('multer')
const { mergePdfs } = require('./merge')

const app = express()
const upload = multer({ dest: 'upload/' })

app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    console.log(req.files)
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    console.log(d)
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.redirect("http://localhost:3000/static/mergedfiles.pdf")
    // res.send({data: req.files})
  } catch (reason) {
    console.log(reason)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})