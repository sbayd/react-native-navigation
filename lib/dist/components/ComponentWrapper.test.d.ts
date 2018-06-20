declare module 'react-test-renderer' {
    interface ReactTestInstance {
        [P: string]: any;
    }
}
export {};
