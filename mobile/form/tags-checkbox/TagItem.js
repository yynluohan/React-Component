import React, { Fragment } from 'react';
import './style.css';

export default (props) => {
  function handleClick() {
    const { data, checked } = props;
    props.onChange(data,!checked);
  }

  const { data, checked } = props;
  return <Fragment>
      <div className={ `tagItemBox ${checked ? 'checked' : ''}` } onClick={ handleClick }>{ data.tagName }</div>
    </Fragment>
}