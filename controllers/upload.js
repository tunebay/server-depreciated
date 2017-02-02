const aws = require('aws-sdk');
const AWSUtil = require('../AWSUtil');
const multer = require('multer');

const s3 = new aws.S3();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000000 } // 5GB
});

exports.uploadMusic = (req, res) => {
  console.log('In upload music:', req.body);
  // AWSUtil.sign(req)
  s3.putObject({
    Bucket: 'tunebay-upload',
    Key: req.filename,
    Expires: 60
  })
};
