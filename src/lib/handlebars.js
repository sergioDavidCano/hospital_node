const moment = require('moment');
moment.locale('es');
const helpers = {};
helpers.timeago = timeStamp => {
    return moment(timeStamp).startOf('minute').fromNow();
}
module.exports = helpers;