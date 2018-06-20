"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const react_native_1 = require("react-native");
let RNNElement;
class Element extends React.Component {
    render() {
        return (<RNNElement {...this.props}/>);
    }
}
Element.propTypes = {
    elementId: PropTypes.string.isRequired,
    resizeMode: PropTypes.string
};
Element.defaultProps = {
    resizeMode: ''
};
exports.Element = Element;
RNNElement = react_native_1.requireNativeComponent('RNNElement', Element);
