hoodie-plugin-tweets
===
A plugin that creates and exposes a publically readable database that stores tweets filtered by a particular keyword. Uses [twit](https://npmjs.org/package/twit) to connect to the twitter streaming API.

Install
---
    hoodie install tweets

Configure
---
Use `config.json` to configure the database name, the keyword to track and the keys, secrets and tokens necessary to connect to the Twitter API.

Use
---
In the frontend:

```javascript
var hoodie  = new Hoodie()
  , store = hoodie.open("hoodie-plugin-tweets")

// Find tweets
store.findAll("tweet").done(function (tweets) {})

// Listen to store events
store.on("add:tweet", function (tweet) {})

// Connect to the store
store.connect()
```
