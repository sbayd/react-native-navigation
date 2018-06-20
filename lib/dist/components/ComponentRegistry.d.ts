/// <reference types="react" />
import { ComponentProvider } from 'react-native';
import { ComponentType } from 'react';
export declare class ComponentRegistry {
    private store;
    constructor(store: any);
    registerComponent(componentName: string, getComponentClassFunc: ComponentProvider): ComponentType<any>;
}
