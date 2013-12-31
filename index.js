var Twit = require("twit")
  , config = require("./config.json") // TODO: Use hoodie config API

function watchAndUpdate (db, cb) {
  var stream = new Twit(config.twit).stream("statuses/filter", {track: config.track})

  stream.on("tweet", function (tweet) {
    db.add("tweet", tweet, function (er) {
      if (er) return console.warn("Failed to add tweet", tweet, er)
      console.log("Added tweet", tweet)
    })
  })

  cb()
}

module.exports = function (hoodie, cb) {
  hoodie.database.findAll(function (er, dbs) {
    if (er) return cb(er)

    if (dbs.indexOf(config.db_name) == -1) {

      hoodie.database.add(config.db_name, function (er, db) {
        if (er) return cb(er)

        db.grantPublicReadAccess(function (er) {
          if (er) return cb(er)
          watchAndUpdate(db, cb)
        })
      })

    } else {
      watchAndUpdate(hoodie.database(config.db_name), cb)
    }
  })
}