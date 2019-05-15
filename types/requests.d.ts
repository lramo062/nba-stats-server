export = index;
declare class index {
    static AXO(): any;
    static XHR(): any;
    static active: {};
    static defaults: {
        headers: {
            "Content-Type": string;
        };
        manual: boolean;
        method: string;
        mode: string;
        streaming: boolean;
    };
    static extend(protoProps: any, staticProps: any): any;
    static method: string;
    static requested: number;
    static streaming: boolean;
    static supported: boolean;
    static type: {
        arraybuffer: boolean;
        blob: boolean;
        document: boolean;
        json: boolean;
        mozblob: boolean;
        mozchunkedarraybuffer: boolean;
        mozchunkedtext: boolean;
        msstream: boolean;
        text: boolean;
    };
    constructor(url: any, options: any, ...args: any[]);
    addListener(event: any, fn: any, context: any): any;
    destroy(): any;
    emit(event: any, a1: any, a2: any, a3: any, a4: any, a5: any, ...args: any[]): any;
    eventNames(): any;
    initialize(url: any): void;
    listeners(event: any, exists: any): any;
    merge(target: any, ...args: any[]): any;
    off(event: any, fn: any, context: any, once: any): any;
    on(event: any, fn: any, context: any): any;
    once(event: any, fn: any, context: any): any;
    open(): void;
    removeAllListeners(event: any): any;
    removeListener(event: any, fn: any, context: any, once: any): any;
    setMaxListeners(): any;
}
