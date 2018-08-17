import React from 'react';
import OrderListItem from '../components/orderListItem/OrderListItem';

const OrderListItemShow = ({ }) => {


  const list = [
    {
      'icon': 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'title': '珠江新城体验二店',
      'subtitle': '广州市天河区珠江西路23号珠江新城商城专柜',
      'orderNumber': '我的订单：325588885555',
      'type': '测试类型：皮肤测试',
      'timestamp': '预约时间：2018.07.17 10:30:00',
      'place': '广州市',
      'distance': '1.5km',
      'action': '/aaa'
    },
    {
      'icon': 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'title': '白云汇体验二店',
      'subtitle': '广州市白云区白云汇商城专柜',
      'place': '广州市',
      'distance': '1.5km',
    }
  ]


  return (
    <div>
      {
        list.length > 0 && list.map((item,index) =>(
          <div key={index}>
            <OrderListItem { ...item }/>
          </div>
        ))
      }
    </div>
  )


}

export default OrderListItemShow
