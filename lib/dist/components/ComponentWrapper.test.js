"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const renderer = require("react-test-renderer");
const ComponentWrapper_1 = require("./ComponentWrapper");
const Store_1 = require("./Store");
describe('ComponentWrapper', () => {
    let store;
    const componentName = 'example.MyComponent';
    let childRef;
    class MyComponent extends React.Component {
        render() {
            return <react_native_1.Text>{'Hello, World!'}</react_native_1.Text>;
        }
    }
    MyComponent.options = {
        title: 'MyComponentTitle'
    };
    class TestParent extends React.Component {
        constructor(props) {
            super(props);
            this.ChildClass = props.ChildClass;
            this.state = { propsFromState: {} };
        }
        render() {
            return (<this.ChildClass ref={(r) => childRef = r} componentId='component1' {...this.state.propsFromState}/>);
        }
    }
    beforeEach(() => {
        store = new Store_1.Store();
    });
    it('must have componentId as prop', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const orig = console.error;
        console.error = (a) => a;
        expect(() => {
            renderer.create(<NavigationComponent />);
        }).toThrowError('Component example.MyComponent does not have a componentId!');
        console.error = orig;
    });
    it('wraps the component', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        expect(NavigationComponent).not.toBeInstanceOf(MyComponent);
        const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
        expect(tree.toJSON().children).toEqual(['Hello, World!']);
        expect(tree.getInstance().originalComponentRef).toBeInstanceOf(MyComponent);
    });
    it('injects props from wrapper into original component', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component1'} myProp={'yo'}/>);
        expect(tree.getInstance().originalComponentRef.props.myProp).toEqual('yo');
    });
    it('updates props from wrapper into original component', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<TestParent ChildClass={NavigationComponent}/>);
        expect(childRef.props.foo).toEqual(undefined);
        tree.getInstance().setState({ propsFromState: { foo: 'yo' } });
        expect(childRef.props.foo).toEqual('yo');
    });
    it('pulls props from the store and injects them into the inner component', () => {
        store.setPropsForId('component123', { numberProp: 1, stringProp: 'hello', objectProp: { a: 2 } });
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component123'}/>);
        const originalComponentProps = tree.getInstance().originalComponentRef.props;
        expect(originalComponentProps).toEqual({ componentId: 'component123', numberProp: 1, stringProp: 'hello', objectProp: { a: 2 } });
    });
    it('updates props from store into inner component', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<TestParent ChildClass={NavigationComponent}/>);
        store.setPropsForId('component1', { myProp: 'hello' });
        expect(childRef.originalComponentRef.props.foo).toEqual(undefined);
        expect(childRef.originalComponentRef.props.myProp).toEqual(undefined);
        tree.getInstance().setState({ propsFromState: { foo: 'yo' } });
        expect(childRef.originalComponentRef.props.foo).toEqual('yo');
        expect(childRef.originalComponentRef.props.myProp).toEqual('hello');
    });
    it('protects id from change', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<TestParent ChildClass={NavigationComponent}/>);
        expect(childRef.originalComponentRef.props.componentId).toEqual('component1');
        tree.getInstance().setState({ propsFromState: { id: 'ERROR' } });
        expect(childRef.originalComponentRef.props.componentId).toEqual('component1');
    });
    it('assignes key by id', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
        expect(tree.getInstance().originalComponentRef.props.componentId).toEqual('component1');
        expect(tree.getInstance().originalComponentRef._reactInternalInstance.key).toEqual('component1');
    });
    it('saves self ref into store', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
        expect(store.getRefForId('component1')).toBeDefined();
        expect(store.getRefForId('component1')).toBe(tree.getInstance());
    });
    it('cleans ref from store on unMount', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
        expect(store.getRefForId('component1')).toBeDefined();
        tree.unmount();
        expect(store.getRefForId('component1')).toBeUndefined();
    });
    it('holds ref to OriginalComponent', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
        expect(tree.getInstance().originalComponentRef).toBeDefined();
        expect(tree.getInstance().originalComponentRef).toBeInstanceOf(MyComponent);
    });
    it('cleans ref to internal component on unount', () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
        const instance = tree.getInstance();
        expect(instance.originalComponentRef).toBeInstanceOf(React.Component);
        tree.unmount();
        expect(instance.originalComponentRef).toBeFalsy();
    });
    it(`merges static members from wrapped component`, () => {
        const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
        expect(NavigationComponent.options).toEqual({ title: 'MyComponentTitle' });
    });
    describe('component lifecycle', () => {
        const componentDidAppearCallback = jest.fn();
        const componentDidDisappearCallback = jest.fn();
        const onNavigationButtonPressedCallback = jest.fn();
        const onSearchBarCallback = jest.fn();
        class MyLifecycleComponent extends MyComponent {
            componentDidAppear() {
                componentDidAppearCallback();
            }
            componentDidDisappear() {
                componentDidDisappearCallback();
            }
            onNavigationButtonPressed() {
                onNavigationButtonPressedCallback();
            }
            onSearchBarUpdated() {
                onSearchBarCallback();
            }
        }
        it('componentDidAppear, componentDidDisappear and onNavigationButtonPressed are optional', () => {
            const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyComponent, store);
            const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
            expect(() => tree.getInstance().componentDidAppear()).not.toThrow();
            expect(() => tree.getInstance().componentDidDisappear()).not.toThrow();
            expect(() => tree.getInstance().onNavigationButtonPressed()).not.toThrow();
            expect(() => tree.getInstance().onSearchBarUpdated()).not.toThrow();
        });
        it('calls componentDidAppear on OriginalComponent', () => {
            const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyLifecycleComponent, store);
            const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
            expect(componentDidAppearCallback).toHaveBeenCalledTimes(0);
            tree.getInstance().componentDidAppear();
            expect(componentDidAppearCallback).toHaveBeenCalledTimes(1);
        });
        it('calls componentDidDisappear on OriginalComponent', () => {
            const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyLifecycleComponent, store);
            const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
            expect(componentDidDisappearCallback).toHaveBeenCalledTimes(0);
            tree.getInstance().componentDidDisappear();
            expect(componentDidDisappearCallback).toHaveBeenCalledTimes(1);
        });
        it('calls onNavigationButtonPressed on OriginalComponent', () => {
            const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyLifecycleComponent, store);
            const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
            expect(onNavigationButtonPressedCallback).toHaveBeenCalledTimes(0);
            tree.getInstance().onNavigationButtonPressed();
            expect(onNavigationButtonPressedCallback).toHaveBeenCalledTimes(1);
        });
        it('calls onSearchBarUpdated on OriginalComponent', () => {
            const NavigationComponent = ComponentWrapper_1.ComponentWrapper.wrap(componentName, MyLifecycleComponent, store);
            const tree = renderer.create(<NavigationComponent componentId={'component1'}/>);
            expect(onSearchBarCallback).toHaveBeenCalledTimes(0);
            tree.getInstance().onSearchBarUpdated();
            expect(onSearchBarCallback).toHaveBeenCalledTimes(1);
        });
    });
});
