'use strict';

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
	console.log("printer.js this.broker is: " + this.broker);
        this.configuration = configuration;
	console.log("printer.js config is: " + configuration);
	console.log("printer.js this.config is: " + this.configuration);

        return true;
    },

    receive: function (message) {
        console.log(`printer.receive - ${message.content}`);
    },

    destroy: function () {
        console.log('printer.destroy');
    }
};
