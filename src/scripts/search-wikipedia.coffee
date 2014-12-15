# Description
#   A Hubot script that searches Wikipedia (ja) by keyword
#
# Configuration:
#   None
#
# Commands:
#   hubot wikipedia <keyword> - search Wikipedia (ja) by keyword
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  url = require 'url'

  robot.respond /wikipedia (.+)$/i, (res) ->
    query = res.match[1]
    request {
      url: 'http://ja.wikipedia.org/w/index.php'
      method: 'GET'
      followRedirect: false
      qs:
        search: query
        title: '特別:検索'
        go: '表示'
    }
    .then (r) ->
      url = r.headers['location']
      res.send url ? 'not found'
