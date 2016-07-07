// MusicMachine.remove({});
Meteor.startup(function () {
    if (MusicMachine.find().count() === 0) {
        MusicMachine.insert({slide: 50});
    }
});

Meteor.publish("musicMachine", function() {
    return MusicMachine.find();
});
