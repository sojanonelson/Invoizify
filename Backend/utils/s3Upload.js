const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer-S3 configuration
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `templates/${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = { s3, upload };