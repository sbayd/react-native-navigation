"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class Constants {
    static get() {
        if (!this.instance) {
            this.instance = new Constants();
        }
        return this.instance;
    }
    constructor() {
        const m = react_native_1.NativeModules.RNNBridgeModule;
        this.statusBarHeight = m.statusBarHeight;
        this.backButtonId = m.backButtonId;
    }
}
exports.Constants = Constants;
