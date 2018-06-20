/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare class Element extends React.Component<{
    elementId: any;
    resizeMode: any;
}, any> {
    static propTypes: {
        elementId: PropTypes.Validator<any>;
        resizeMode: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        resizeMode: string;
    };
    render(): JSX.Element;
}
