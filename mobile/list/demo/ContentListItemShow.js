import React from 'react';
import ContentListItem from '../components/contentListItem/ContentListItem';

const ContentListItemShow = ({

}) => {

  const list  = [
    {
      image:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      title:'撒范德萨发',
      content:'水电费广东省的撒第三方是的丰富的撒个水电费股东会第三个梵蒂冈是电饭锅电饭锅和地方2啥地方和东方红党的风格和当事人撒地方发给大商股份沙发垫付SD敢达放入\
      水电费广东省的撒第三方是的丰富的撒个水电费股东会第三个梵蒂冈是电饭锅电饭锅和地方2啥地方和东方红党的风格和当事人撒地方发给大商股份沙发垫付SD敢达放入\
      水电费广东省的撒第三方是的丰富的撒个水电费股东会第三个梵蒂冈是电饭锅电饭锅和地方2啥地方和东方红党的风格和当事人撒地方发给大商股份沙发垫付SD敢达放入',
      stats:{
        icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
        record:0,
      },
      route:'',
    },
    {
      image:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      title:'阿是大富商大贾',
      content:'大撒地方大帅哥和电话',
      stats:{
        icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
        record:1,
      },
      route:'',
    },
  ]


  return(
    <div>
      {
        list.map((item,index) => (
          <ContentListItem {...item} key={index}/>
        ))
      }
    </div>
  )


}

export default ContentListItemShow
