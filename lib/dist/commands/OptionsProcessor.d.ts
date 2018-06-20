export declare class OptionsProcessor {
    store: any;
    uniqueIdProvider: any;
    constructor(store: any, uniqueIdProvider: any);
    processOptions(options: any): void;
    private processColor(key, value, options);
    private processImage(key, value, options);
    private processButtonsPassProps(key, value);
    private processComponent(key, value, options);
}
