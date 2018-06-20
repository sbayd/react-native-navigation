export declare class Store {
    private componentsByName;
    private propsById;
    private refsById;
    setPropsForId(componentId: string, props: any): void;
    getPropsForId(componentId: string): any;
    setOriginalComponentClassForName(componentName: string, ComponentClass: any): void;
    getOriginalComponentClassForName(componentName: string): any;
    setRefForId(id: string, ref: any): void;
    getRefForId(id: string): any;
    cleanId(id: string): void;
}
