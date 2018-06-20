"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NativeCommandsSender_1 = require("./adapters/NativeCommandsSender");
const NativeEventsReceiver_1 = require("./adapters/NativeEventsReceiver");
const UniqueIdProvider_1 = require("./adapters/UniqueIdProvider");
const Store_1 = require("./components/Store");
const ComponentRegistry_1 = require("./components/ComponentRegistry");
const Commands_1 = require("./commands/Commands");
const LayoutTreeParser_1 = require("./commands/LayoutTreeParser");
const LayoutTreeCrawler_1 = require("./commands/LayoutTreeCrawler");
const EventsRegistry_1 = require("./events/EventsRegistry");
const Element_1 = require("./adapters/Element");
const ComponentEventsObserver_1 = require("./events/ComponentEventsObserver");
const CommandsObserver_1 = require("./events/CommandsObserver");
const Constants_1 = require("./adapters/Constants");
class Navigation {
    constructor() {
        this.Element = Element_1.Element;
        this.store = new Store_1.Store();
        this.nativeEventsReceiver = new NativeEventsReceiver_1.NativeEventsReceiver();
        this.uniqueIdProvider = new UniqueIdProvider_1.UniqueIdProvider();
        this.componentRegistry = new ComponentRegistry_1.ComponentRegistry(this.store);
        this.layoutTreeParser = new LayoutTreeParser_1.LayoutTreeParser();
        this.layoutTreeCrawler = new LayoutTreeCrawler_1.LayoutTreeCrawler(this.uniqueIdProvider, this.store);
        this.nativeCommandsSender = new NativeCommandsSender_1.NativeCommandsSender();
        this.commandsObserver = new CommandsObserver_1.CommandsObserver();
        this.commands = new Commands_1.Commands(this.nativeCommandsSender, this.layoutTreeParser, this.layoutTreeCrawler, this.commandsObserver, this.uniqueIdProvider);
        this.eventsRegistry = new EventsRegistry_1.EventsRegistry(this.nativeEventsReceiver, this.commandsObserver);
        this.componentEventsObserver = new ComponentEventsObserver_1.ComponentEventsObserver(this.eventsRegistry, this.store);
        this.componentEventsObserver.registerForAllComponents();
    }
    /**
     * Every navigation component in your app must be registered with a unique name.
     * The component itself is a traditional React component extending React.Component.
     */
    registerComponent(componentName, getComponentClassFunc) {
        return this.componentRegistry.registerComponent(componentName, getComponentClassFunc);
    }
    /**
     * Reset the app to a new layout
     */
    setRoot(layout) {
        return this.commands.setRoot(layout);
    }
    /**
     * Set default options to all screens. Useful for declaring a consistent style across the app.
     */
    setDefaultOptions(options) {
        this.commands.setDefaultOptions(options);
    }
    /**
     * Change a component's navigation options
     */
    mergeOptions(componentId, options) {
        this.commands.mergeOptions(componentId, options);
    }
    /**
     * Show a screen as a modal.
     */
    showModal(layout) {
        return this.commands.showModal(layout);
    }
    /**
     * Dismiss a modal by componentId. The dismissed modal can be anywhere in the stack.
     */
    dismissModal(componentId) {
        return this.commands.dismissModal(componentId);
    }
    /**
     * Dismiss all Modals
     */
    dismissAllModals() {
        return this.commands.dismissAllModals();
    }
    /**
     * Push a new layout into this screen's navigation stack.
     */
    push(componentId, layout) {
        return this.commands.push(componentId, layout);
    }
    /**
     * Pop a component from the stack, regardless of it's position.
     */
    pop(componentId, params) {
        return this.commands.pop(componentId, params);
    }
    /**
     * Pop the stack to a given component
     */
    popTo(componentId) {
        return this.commands.popTo(componentId);
    }
    /**
     * Pop the component's stack to root.
     */
    popToRoot(componentId) {
        return this.commands.popToRoot(componentId);
    }
    /**
     * Sets new root component to stack.
     */
    setStackRoot(componentId, layout) {
        return this.commands.setStackRoot(componentId, layout);
    }
    /**
     * Show overlay on top of the entire app
     */
    showOverlay(layout) {
        return this.commands.showOverlay(layout);
    }
    /**
     * dismiss overlay by componentId
     */
    dismissOverlay(componentId) {
        return this.commands.dismissOverlay(componentId);
    }
    /**
     * Obtain the events registry instance
     */
    events() {
        return this.eventsRegistry;
    }
    /**
     * Constants coming from native
     */
    constants() {
        return Constants_1.Constants.get();
    }
}
exports.Navigation = Navigation;
