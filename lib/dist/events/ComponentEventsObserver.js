"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BUTTON_PRESSED_EVENT_NAME = 'buttonPressed';
const ON_SEARCH_BAR_UPDATED = 'searchBarUpdated';
class ComponentEventsObserver {
    constructor(eventsRegistry, store) {
        this.eventsRegistry = eventsRegistry;
        this.store = store;
        this.componentDidAppear = this.componentDidAppear.bind(this);
        this.componentDidDisappear = this.componentDidDisappear.bind(this);
        this.onNativeEvent = this.onNativeEvent.bind(this);
    }
    registerForAllComponents() {
        this.eventsRegistry.registerComponentDidAppearListener(this.componentDidAppear);
        this.eventsRegistry.registerComponentDidDisappearListener(this.componentDidDisappear);
        this.eventsRegistry.registerNativeEventListener(this.onNativeEvent);
    }
    componentDidAppear(componentId) {
        const componentRef = this.store.getRefForId(componentId);
        if (componentRef && componentRef.componentDidAppear) {
            componentRef.componentDidAppear();
        }
    }
    componentDidDisappear(componentId) {
        const componentRef = this.store.getRefForId(componentId);
        if (componentRef && componentRef.componentDidDisappear) {
            componentRef.componentDidDisappear();
        }
    }
    onNativeEvent(name, params) {
        if (name === BUTTON_PRESSED_EVENT_NAME) {
            const componentRef = this.store.getRefForId(params.componentId);
            if (componentRef && componentRef.onNavigationButtonPressed) {
                componentRef.onNavigationButtonPressed(params.buttonId);
            }
        }
        if (name === ON_SEARCH_BAR_UPDATED) {
            const componentRef = this.store.getRefForId(params.componentId);
            if (componentRef && componentRef.onSearchBarUpdated) {
                componentRef.onSearchBarUpdated(params.text, params.isFocused);
            }
        }
    }
}
exports.ComponentEventsObserver = ComponentEventsObserver;
