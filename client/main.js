Meteor.startup(function () {
    Meteor.subscribe("musicMachine");
});


Template.playground.helpers({
    "startdac": function () {
        var starter = MusicMachine.findOne();
        if (starter) {
            if (starter.start == 1) {
                playAll();
            }
        }
        return Session.get("startdac");
    },

    "drums": function () {
        var starter = MusicMachine.findOne();
        if (starter) {
            if (starter.drums == 1) {
                playDrums();
            } else if (starter.drums == 0) {
                stopDrums();
            }
        }
        return Session.get("drums");
    },

    "bass": function () {
        var starter = MusicMachine.findOne();
        if (starter) {
            if (starter.bassline == 1) {
                playBass();
            } else if (starter.bassline == 0) {
                stopBass();
            }
        }
        return Session.get("bass");
    },

    "arp": function () {
        var starter = MusicMachine.findOne();
        if (starter) {
            if (starter.arp == 1) {
                playArp();
            } else if (starter.arp == 0) {
                stopArp();
            }
        }
        return Session.get("arp");
    },

    "sliderVal1": function() {
        var slider = MusicMachine.findOne();
        if (slider) {
            Template.instance().$("#slider1").data("uiSlider").value(slider.slide);
            setSpeed(slider.slide / 50);
            return slider.slide;
        }
    },
});


Template.playground.events({
    "click button.startButton": function () {
        Session.set("startdac", 1);
        var val = MusicMachine.findOne({});
        var start = {};
        start["$set"] = {start: 1};
        Meteor.call("setSound", val._id, start);
    },

    "click button.myButton1": function () {
        Session.set("drums", 1);
        var val = MusicMachine.findOne({});
        var drums = {};
        drums["$set"] = {drums: 1};
        Meteor.call("setSound", val._id, drums);
    },

    "click button.myButton2": function () {
        Session.set("drums", 0);
        var val = MusicMachine.findOne({});
        var drums = {};
        drums["$set"] = {drums: 0};
        Meteor.call("setSound", val._id, drums);
    },

    "click button.myButton3": function () {
        Session.set("bass", 1);
        var val = MusicMachine.findOne({});
        var bassline = {};
        bassline["$set"] = {bassline: 1};
        Meteor.call("setSound", val._id, bassline);
    },

    "click button.myButton4": function () {
        Session.set("bass", 0);
        var val = MusicMachine.findOne({});
        var bassline = {};
        bassline["$set"] = {bassline: 0};
        Meteor.call("setSound", val._id, bassline);
    },

    "click button.myButton5": function () {
        Session.set("arp", 1);
        var val = MusicMachine.findOne({});
        var arp = {};
        arp["$set"] = {arp: 1};
        Meteor.call("setSound", val._id, arp);
    },

    "click button.myButton6": function () {
        Session.set("arp", 0);
        var val = MusicMachine.findOne({});
        var arp = {};
        arp["$set"] = {arp: 0};
        Meteor.call("setSound", val._id, arp);
    }
});

Template.playground.onRendered(function() {
    $("h2").hide();
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, {leading: false});

    if (!this.$("#slider1").data("uiSlider")) {
        $("#slider1").slider({
            slide: handler,
            min: 0,
            max: 100
        });
    }
});
