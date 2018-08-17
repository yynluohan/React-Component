import React from 'react';
import OrderCartListItem from '../components/orderCartListItem/OrderCartListItem';

const OrderCartListItemShow = ({

}) => {

  const orderCartListItemProps = {
    title: '潮汕牛肉馆',
    oderNumber: 'NO.123456',
    time: '2018-8-17 18:56',
    tableNumber:'桌号36',
    combineNumber: '1800元/2500罔',
    icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
    defaultNumber: 2,
    list:[
      {
        'title':'兰州拉面',
        'subtitle':'兰州 ·》？',
        'value':'300元/1000罔',
        'status': '*2'
      },
      {
        'title':'杨国福麻辣烫',
        'subtitle':'杨国福||卡·1',
        'value':'300元/1000罔',
        'status': '*5'
      },
      {
        'title':'傣妹牛肉火锅',
        'subtitle':'傣妹牛肉LL',
        'value':'300元/1000罔',
        'status': '*6'
      },
      {
        'title':'兰州拉面',
        'subtitle':'兰州 ·》？',
        'value':'300元/1000罔',
        'status': '*2'
      },
      {
        'title':'杨国福麻辣烫',
        'subtitle':'杨国福||卡·1',
        'value':'300元/1000罔',
        'status': '*5'
      },
      {
        'title':'傣妹牛肉火锅',
        'subtitle':'傣妹牛肉LL',
        'value':'300元/1000罔',
        'status': '*6'
      },
    ]
  }

  return (
    <div>
      <OrderCartListItem {...orderCartListItemProps}/>
    </div>
  )
}


export default OrderCartListItemShow;
