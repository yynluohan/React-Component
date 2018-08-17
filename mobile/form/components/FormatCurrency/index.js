import React from 'react';

export default ({ value }) => {
  value = parseFloat(value).toFixed(2);
  const rst = `￥ ${value.toLocaleString('en-US',{useGrouping:true})}`;
  return <span style={{
    textAlign: 'right',
    display: 'inline-block',
    width: '100%'
  }}>{ rst }</span>;
}