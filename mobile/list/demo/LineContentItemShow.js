import React from 'react';
import LineContentItem from '../components/lineContentItem/LineContentItem';
import LineContentItemLayout from '../components/lineContentItemLayout/LineContentItemLayout'

const LineContentItemShow = ({

}) => {

  const list = [
    {
      'icon': 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'title': '用户名',
      'content': '赞了你的说说',
    },
    {
      'icon': 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'title': '用户名',
      'content': '赞了你的说说',
    },
  ]


  return (
    <div>
     {
       list.length > 0 && list.map((item,index) => (
         <div key={index}>
            <LineContentItemLayout {...item}/>
         </div>
       ))
     }

    </div>
  )
}

export default LineContentItemShow
