'use strict';

let GrovePi = require('node-grovepi').GrovePi;
let Commands = GrovePi.commands;
let Board = GrovePi.board;
let DHTSensor = GrovePi.sensors.DHTDigitalSensor;

module.exports = {
    broker: null,
    configuration: null,
    board: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        this.board = new Board({
            debug: true,
            onError: function(err) {
                console.log(`Something wrong with board: ${err} `);
            },
            onInit: function(res) {
                if (res) {
                    console.log(`GrovePi version: ${board.version()}`);
                }
                var TempAndHumiditySensor = new DHTSensor(4, DHTSensor.Version.DHT11);
                console.log('Temperature and Humidity sensor activated');
                TempAndHumiditySensor.stream(4000, function(res) {
                    this.broker.publish({
                        properties: {
                            'source': 'groveboard'
                        },
                        content: res
                    })
                });
            }
        });

        return true;
    },

    start: function () {
        board.init();
    },

    receive: function(message) {
    },

    destroy: function() {
        console.log('board destroy');
        this.board.close();
    }
};
