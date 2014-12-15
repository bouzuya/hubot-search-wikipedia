// Description
//   A Hubot script that searches Wikipedia (ja) by keyword
//
// Configuration:
//   None
//
// Commands:
//   hubot wikipedia <keyword> - search Wikipedia (ja) by keyword
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var request, url;
  request = require('request-b');
  url = require('url');
  return robot.respond(/wikipedia (.+)$/i, function(res) {
    var query;
    query = res.match[1];
    return request({
      url: 'http://ja.wikipedia.org/w/index.php',
      method: 'GET',
      followRedirect: false,
      qs: {
        search: query,
        title: '特別:検索',
        go: '表示'
      }
    }).then(function(r) {
      url = r.headers['location'];
      return res.send(url != null ? url : 'not found');
    });
  });
};
