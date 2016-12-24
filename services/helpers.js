const moment = require('moment');

exports.getCurrentTimestamp = () => {
  return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
};
