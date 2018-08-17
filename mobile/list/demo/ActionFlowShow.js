import React from 'react';
import ActionFlowItem from '../components/actionFlowItem/ActionFlowItem';

const ActionFlowShow = ({


}) => {


  const actionFlowProps = {
    config:{
      nextIcon: 'url', // 默认是 右箭头
      groupSpan: '15px', //组之间间距
      list:[       //list长度可确定几个组
        {
          title: 'GroupTitle1',   //组1
          items:[
            { icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg', title: 'a-图标1',path:'/a' },
            { icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg', title: 'a-图标2',path:'/a/b' },
            { icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg', title: 'a-图标3',path:'/c' },
          ]
        },
        {
          title: 'GroupTitle2', //组2
          items:[
            { icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg', title: 'b-图标1',path:'/a' },
            { icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg', title: 'b-图标2',path:'/a' },
          ]
        },
     ]
  }
  }

  return (
    <div>
      <ActionFlowItem {...actionFlowProps}/>
    </div>
  )
}

export default ActionFlowShow
