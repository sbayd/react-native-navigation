"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Store {
    constructor() {
        this.componentsByName = {};
        this.propsById = {};
        this.refsById = {};
    }
    setPropsForId(componentId, props) {
        _.set(this.propsById, componentId, props);
    }
    getPropsForId(componentId) {
        return _.get(this.propsById, componentId, {});
    }
    setOriginalComponentClassForName(componentName, ComponentClass) {
        _.set(this.componentsByName, componentName, ComponentClass);
    }
    getOriginalComponentClassForName(componentName) {
        return _.get(this.componentsByName, componentName);
    }
    setRefForId(id, ref) {
        _.set(this.refsById, id, ref);
    }
    getRefForId(id) {
        return _.get(this.refsById, id);
    }
    cleanId(id) {
        _.unset(this.refsById, id);
        _.unset(this.propsById, id);
    }
}
exports.Store = Store;
