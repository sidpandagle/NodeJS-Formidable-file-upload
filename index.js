const express = require('express');
const app = express();
const formidable = require('formidable');
const port = 3010;
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('static'));
// app.use(express.bodyParser());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.post('/', (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: __dirname + '/uploads',
  });
  form.parse(req);
  form.on('fileBegin', (name, file) => {
    console.log(file);
    file.path = __dirname + '/uploads/' + file.originalFilename;
    console.log(file.path);
  });
  form.on('file', (name, file) =>
    console.log('Uploaded File ' + file.originalFilename)
  );
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
