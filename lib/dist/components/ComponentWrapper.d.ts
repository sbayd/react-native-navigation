/// <reference types="react" />
import * as React from 'react';
export declare class ComponentWrapper {
    static wrap(componentName: string, OriginalComponentClass: React.ComponentType<any>, store: any): React.ComponentType<any>;
}
