"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _ = require("lodash");
const ReactLifecyclesCompat = require("react-lifecycles-compat");
class ComponentWrapper {
    static wrap(componentName, OriginalComponentClass, store) {
        class WrappedComponent extends React.Component {
            static getDerivedStateFromProps(nextProps, prevState) {
                return {
                    allProps: _.merge({}, nextProps, store.getPropsForId(prevState.componentId))
                };
            }
            constructor(props) {
                super(props);
                this._assertComponentId();
                this._saveComponentRef = this._saveComponentRef.bind(this);
                this.state = {
                    componentId: props.componentId,
                    allProps: {}
                };
            }
            componentDidMount() {
                store.setRefForId(this.state.componentId, this);
            }
            componentWillUnmount() {
                store.cleanId(this.state.componentId);
            }
            componentDidAppear() {
                if (this.originalComponentRef.componentDidAppear) {
                    this.originalComponentRef.componentDidAppear();
                }
            }
            componentDidDisappear() {
                if (this.originalComponentRef.componentDidDisappear) {
                    this.originalComponentRef.componentDidDisappear();
                }
            }
            onNavigationButtonPressed(buttonId) {
                if (this.originalComponentRef.onNavigationButtonPressed) {
                    this.originalComponentRef.onNavigationButtonPressed(buttonId);
                }
            }
            onSearchBarUpdated(text, isFocused) {
                if (this.originalComponentRef.onSearchBarUpdated) {
                    this.originalComponentRef.onSearchBarUpdated(text, isFocused);
                }
            }
            render() {
                return (<OriginalComponentClass ref={this._saveComponentRef} {...this.state.allProps} componentId={this.state.componentId} key={this.state.componentId}/>);
            }
            _assertComponentId() {
                if (!this.props.componentId) {
                    throw new Error(`Component ${componentName} does not have a componentId!`);
                }
            }
            _saveComponentRef(r) {
                this.originalComponentRef = r;
            }
        }
        ReactLifecyclesCompat.polyfill(WrappedComponent);
        require('hoist-non-react-statics')(WrappedComponent, OriginalComponentClass);
        return WrappedComponent;
    }
}
exports.ComponentWrapper = ComponentWrapper;
