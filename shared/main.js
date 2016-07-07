Meteor.methods({
    setSound: function(id, instrument) {
        MusicMachine.update({_id: id}, instrument);
    },

});
