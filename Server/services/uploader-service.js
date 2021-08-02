const nanoid = require('nanoid');
const multer = require('multer');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    return cb('Please choose a picture (jpeg,jpg,png)');
  }
}

const uploader = multer({
  storage: multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, '../src/assets/main');
    },
    filename: (req, file, cb) => {
      cb(null, 'avatar' + nanoid(6) + '.' + file.mimetype.split('/').pop());
    },
  }),
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = uploader;
