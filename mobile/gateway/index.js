import React, { Fragment, Component } from 'react';
import replaceKey from './utils/replaceKey';

export default class Gateway extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.data || {},
    }
    this.replaceKey = replaceKey(props.map);
  }

  render() {
    const { children } = this.props;
    const { data } = this.state;
    const childrenWithProps = React.Children.map( children, child => React.cloneElement( child, {
      data: this.replaceKey(data),
    }) );
    return (
      <Fragment>
        { childrenWithProps }
      </Fragment>
    );
  }
}