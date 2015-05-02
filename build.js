var fs = require('fs');
var _ = require('underscore');
var loki = require('lokijs');
var Q = require('q');

Q.allSettled([
    Q.nfcall(fs.unlink, 'loki.json'),
    Q.nfcall(fs.readFile, 'eredan_data.json')
]).then(function(args) {
    var data = args[1].value;
    var j = JSON.parse(data);

    // Build database
    var db = new loki('loki.json');
    var cardsDb = db.addCollection('cards');


    // Add to database
    _.each(j.cartes, function(val, id) {
        var owned = !!j.cartes_player[id];
        var Card = {
            id : id,
            owned : owned,
            released : val.released,
            name : j.textes[val.id_nom],
            level : val.niveau,
            grade : val.grade,
            str : val.force,
            //attacks : val.capacites,
            'class' : val.classe.slug,
            race : val.race.slug,
            evolution : val.evolution,
            group : val.groupe
        };
        cardsDb.insert(Card);
    });

    // Svae to file
    db.save();
    console.log('Database generated');
});


