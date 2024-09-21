var express = require('express');
var cors = require('cors');
require('dotenv').config();

// Using an npm package called multer in order to work with file uploads from an HTML form
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Access the uploaded file
  let file = req.file;

  // Return the JSON response with file properties
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
