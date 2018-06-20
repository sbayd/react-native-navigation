"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class NativeEventsReceiver {
    constructor() {
        try {
            this.emitter = new react_native_1.NativeEventEmitter(react_native_1.NativeModules.RNNEventEmitter);
        }
        catch (e) {
            this.emitter = {
                addListener: () => {
                    return {
                        remove: () => undefined
                    };
                }
            };
        }
    }
    registerAppLaunchedListener(callback) {
        return this.emitter.addListener('RNN.appLaunched', callback);
    }
    registerComponentDidAppearListener(callback) {
        return this.emitter.addListener('RNN.componentDidAppear', callback);
    }
    registerComponentDidDisappearListener(callback) {
        return this.emitter.addListener('RNN.componentDidDisappear', callback);
    }
    registerCommandCompletedListener(callback) {
        return this.emitter.addListener('RNN.commandCompleted', callback);
    }
    registerNativeEventListener(callback) {
        return this.emitter.addListener('RNN.nativeEvent', callback);
    }
}
exports.NativeEventsReceiver = NativeEventsReceiver;
