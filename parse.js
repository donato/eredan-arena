var _ = require('underscore');
var loki = require('lokijs');

var Constants = require('./constants.js');

var db = new loki('loki.json', {
    autoload : true,
    autoloadCallback : loaded
});

function loaded() {
    var cardsDb = db.getCollection('cards');

    function getNames(arr) {
        return _.pluck(arr, 'name');
    }


    // Build views
    var myCards = cardsDb.chain().find({owned : true});
    var lvl3 = cardsDb.chain().find({level:3});
    var myLvl3Cards = myCards.copy().find({level : 3});

    // Print summary
    var totalCards = lvl3.data().length;
    var totalCardsOwned = myCards.data().length;
    var lvl3CardsOwned = myLvl3Cards.data().length;
    var notlvl3 = totalCardsOwned - lvl3CardsOwned;

    console.log('Level 3 Cards : ' + lvl3CardsOwned);
    console.log('Other cards : ' + notlvl3);
    console.log('Total Cards : ' + totalCards);
    console.log('----------');



    function iHave(keyName, val) {
        var o = {};
        o[keyName] = val;
        var has = myLvl3Cards.copy().find(o);

        console.log(keyName + ' is ' + val);
        console.log(getNames(has.data()));
    }

    _.each(Constants.Races, function(race) {
        iHave('race', race);
    });

}
