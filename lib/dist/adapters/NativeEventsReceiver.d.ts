import { EventSubscription } from '../interfaces/EventSubscription';
export declare class NativeEventsReceiver {
    private emitter;
    constructor();
    registerAppLaunchedListener(callback: () => void): EventSubscription;
    registerComponentDidAppearListener(callback: (data) => void): EventSubscription;
    registerComponentDidDisappearListener(callback: (data) => void): EventSubscription;
    registerCommandCompletedListener(callback: (data) => void): EventSubscription;
    registerNativeEventListener(callback: (data) => void): EventSubscription;
}
