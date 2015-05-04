# eredan-arena tools

## Download, sort and query card data

Here is a fun little tool to download all card data, and allow you to filter by cards you own, class, guild, level, strength, anything!

### Setup
1. Modify the download.js file and insert your PHPSESSID which can be found by checking your cookies while logged in
2. Run these commands
```sh
node download.js
node build.js
node parse.js
```

### Usage
Running it without modification will output some sample data such as : 
```sh
Your Lvl 3 cards : 77
Other cards : 28
Total Cards : 204
```

You can also add queries for things like
```js
    iHave('race', Constants.Races.beast);  // output all of your beast cards
    iHave('guild', Constants.Guilds.pirate); // filter by guild pirate cards
    iHave('class', Constants.Classes.marauder); // filter by class marauder
```

or get more advanced and write things like
```js
  // Filter for cards with strength greater than 100
  var strongCards = myCards.copy().find({'str':{ '$gt' : 100 }}});
```
