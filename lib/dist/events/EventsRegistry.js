"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsRegistry {
    constructor(nativeEventsReceiver, commandsObserver) {
        this.nativeEventsReceiver = nativeEventsReceiver;
        this.commandsObserver = commandsObserver;
    }
    registerAppLaunchedListener(callback) {
        return this.nativeEventsReceiver.registerAppLaunchedListener(callback);
    }
    registerComponentDidAppearListener(callback) {
        return this.nativeEventsReceiver.registerComponentDidAppearListener(({ componentId, componentName }) => callback(componentId, componentName));
    }
    registerComponentDidDisappearListener(callback) {
        return this.nativeEventsReceiver.registerComponentDidDisappearListener(({ componentId, componentName }) => callback(componentId, componentName));
    }
    registerCommandListener(callback) {
        return this.commandsObserver.register(callback);
    }
    registerCommandCompletedListener(callback) {
        return this.nativeEventsReceiver.registerCommandCompletedListener(({ commandId, completionTime, params }) => callback(commandId, completionTime, params));
    }
    registerNativeEventListener(callback) {
        return this.nativeEventsReceiver.registerNativeEventListener(({ name, params }) => callback(name, params));
    }
}
exports.EventsRegistry = EventsRegistry;
