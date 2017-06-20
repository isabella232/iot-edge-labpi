# Prerequisites
- Install [Node.js](https://nodejs.org/)

- The following packages are needed and they can be installed with the following commands:

    ```
    sudo apt-get update 
    sudo apt-get install curl build-essential libcurl4-openssl-dev git cmake pkg-config libssl-dev uuid-dev valgrind libglib2.0-dev libtool autoconf
    ```

From the command line:
- `cd iot-edge-lab/tools/`
- `./build_nodejs.sh`
  - Will download and build Node JS from source as runtime linked modules
- Copy and paste the `export` message that shows up on screen to set the `NODE_INCLUDE` and `NODE_LIB` environment variables
- `./build.sh --enable-nodejs-binding`
  - If you see a libuv dependency missing when attempting to run this command, try:
    ```
	sudo apt-get install -y libtool autoconf
	./build.sh --disable-native-remote-modules --disable-nodejs-remote-modules
    ```
  - and run `./build.sh --enable-nodejs-binding` again
- `cd ../samples/nodejs_simple_sample/nodejs_modules/`
- `npm install`

## Run IoT Gateway Modules
On a terminal window follow these steps:
- `cd <azure_iot_gateway_sdk_root>/samples/nodejs_simple_sample/src/`
- `cd ../build/samples/nodejs_simple_sample/`
- `./nodejs_simple_sample ../../samples/nodejs_simple_sample/src/gateway_sample_mod.json`

#TODO Write module to use native IoT Hub and NOT NodeJS Iot Hub SDK.
