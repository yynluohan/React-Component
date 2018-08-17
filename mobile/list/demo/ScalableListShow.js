import React from 'react';
import ScalableList from '../components/scalableList/ScalableList';

const ScalableListShow = ({

}) => {

  const list1 = [
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

  const list2 = [
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

  const list3 = [
    {
      title: '潮汕牛肉馆',
      oderNumber: 'NO.123456',
      time: '2018-8-17 18:56',
      tableNumber:'桌号36',
      combineNumber: '1800元/2500罔',
      icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      defaultNumber: 3,
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
      ]
    },
    {
      title: '潮汕牛肉馆',
      oderNumber: 'NO.123456',
      time: '2018-8-17 18:56',
      tableNumber:'桌号36',
      combineNumber: '1800元/2500罔',
      icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      defaultNumber: 3,
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
      ]
    }
  ]

  let newList3 = [];
  newList3 = list3.concat(list3)

  const listProps1 = {
    list:list1,
    loading:false,
    API: '',
    onPagination(){

    },
    item: {
      type:'lineContentItem',
      layout: ''
    },
    pulltorefresh: false,
    loadmore: false,
    separator:{
      height:'2px'
    },
    lineContentItemProps:{
      itemImg:{
        width: '2em'
      }
    }
  }

  const listProps2 = {
    list:list2,
    loading:false,
    API: '',
    onPagination(){

    },
    item: {
      type:'orderListItem',
      layout: ''
    },
    pulltorefresh: false,
    loadmore: false,
    separator:{
      height:'2px'
    },
    orderListItemProps:{

    }
  }

  const listProps3 = {
    list:newList3,
    loading:false,
    API: '',
    onPagination(){

    },
    item: {
      type:'orderCartListItem',
      layout: ''
    },
    pulltorefresh: false,
    loadmore: true,
    separator:{
      height:'2px'
    },
    orderCartListItemProps:{

    }
  }

  return (
    <div>
      <ScalableList {...listProps1}/>
      <div style={{marginTop: '3em'}}>
        <ScalableList {...listProps2}/>
      </div>
      <div style={{marginTop: '3em'}}>
        <ScalableList {...listProps3}/>
      </div>
    </div>
  )

}

export default ScalableListShow;
