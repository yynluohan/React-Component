import React from 'react';
import FlowItem from '../components/flowItem/FlowItem';

const FlowItemShow = ({

}) => {

  const flowItemProps1 = {
    icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
    title: '图标1',
    path: '/actionFlowShow'
  }

  const flowItemProps2 = {
    icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
    title: '图标2',
    path: '/dashboard'
  }

  return (
    <div>
      <FlowItem {...flowItemProps1}/>
      <FlowItem {...flowItemProps2}/>
    </div>
  )

}

export default FlowItemShow
