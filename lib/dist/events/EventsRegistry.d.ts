import { NativeEventsReceiver } from '../adapters/NativeEventsReceiver';
import { CommandsObserver } from './CommandsObserver';
import { EventSubscription } from '../interfaces/EventSubscription';
export declare class EventsRegistry {
    private nativeEventsReceiver;
    private commandsObserver;
    constructor(nativeEventsReceiver: NativeEventsReceiver, commandsObserver: CommandsObserver);
    registerAppLaunchedListener(callback: () => void): EventSubscription;
    registerComponentDidAppearListener(callback: (componentId: string, componentName: string) => void): EventSubscription;
    registerComponentDidDisappearListener(callback: (componentId: string, componentName: string) => void): EventSubscription;
    registerCommandListener(callback: (name: string, params: any) => void): EventSubscription;
    registerCommandCompletedListener(callback: (commandId: string, completionTime: number, params: any) => void): EventSubscription;
    registerNativeEventListener(callback: (name: string, params: any) => void): EventSubscription;
}
