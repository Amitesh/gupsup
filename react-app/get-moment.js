'use strict';

var moment = require('moment');

moment.locale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "secs",
        m:  "a min",
        mm: "%d mins",
        h:  "an hr",
        hh: "%d hrs",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d yrs"
    }
});

module.exports = moment;