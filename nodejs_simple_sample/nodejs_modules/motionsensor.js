'use strict';

let GpioPins = require('onoff').Gpio;

module.exports = {
    broker: null,
    configuration: null,
    motion_sensor: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        if (this.configuration && this.configuration.gpio_pin_number) {
            this.motion_sensor = new GpioPins(this.configuration.gpio_pin_number, 'in', 'both');
        } else {
            this.motion_sensor = new GpioPins(4, 'in', 'both');
        }

        return true;
    },

    start: function () {
        setInterval(() => {
            var message = "Motion Value: ";
            this.motion_sensor.watch(function(err, value) {
                if (err) {
                    console.log("Error: " + err);
                } else {
                    message += value;
                }
            });
            this.broker.publish({
                properties: {
                    'source': 'motionsensor'
                },
                content: message
            });
        }, 500);
    },

    receive: function(message) {
    },

    destroy: function() {
        console.log('sensor.destroy');
        this.motion_sensor.unexport();
    }
};
