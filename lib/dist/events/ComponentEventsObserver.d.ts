import { EventsRegistry } from './EventsRegistry';
import { Store } from '../components/Store';
export declare class ComponentEventsObserver {
    private eventsRegistry;
    private store;
    constructor(eventsRegistry: EventsRegistry, store: Store);
    registerForAllComponents(): void;
    private componentDidAppear(componentId);
    private componentDidDisappear(componentId);
    private onNativeEvent(name, params);
}
