import React from 'react';
import Gateway from '../components/gateway';

const Item = ({ data }) => {
  console.log(data);
  return <div>
    <h2> 映射后数据: </h2>
    <pre>{ JSON.stringify(data,null,2) }</pre>
  </div>
}
const map = {
  test: 'format',
};

const data = {
  test: 'test value',
  demo: 'demo value',
  items: [
    { test: 'item test value' },
    { demo: 'item demo value' }
  ],
}

export default class Wrapped extends React.Component{
  render(){
    return <div>
      <h2> 原始数据:  </h2>
      <pre>{ JSON.stringify(data,null,2) }</pre>
      <h2> 映射 map :  </h2>
      <pre>{ JSON.stringify(map,null,2) }</pre>
      
      <Gateway data={ data } map={ map }>
        <Item />
      </Gateway>
    </div>
  }
}