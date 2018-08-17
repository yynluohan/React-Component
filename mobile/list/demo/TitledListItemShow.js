import React from 'react';
import TitledListItem from '../components/titledListItem/TitledListItem';


const TitledListItemShow = ({


}) => {

  const list1 = [
    {
      'title':'充值',
      'subtitle':'零钱余额： 361元',
      'value':'+300',
      'status': '2018-7-15'
    },
    {
      'title':'提现',
      'subtitle':'零钱余额：254元',
      'value':'+200',
      'status': '2018-7-16'
    },
    {
      'title':'转账',
      'subtitle':'零钱余额: 300元',
      'value':'-260',
      'status': '2018-7-17'
    },
  ]

  const list2 = [
    {
      'title':'积分抵钱',
      'value':'+50',
      'icon':'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'status': '07-17',
      'subtitle': '订单号：1122354455656'
    },
    {
      'title':'购物赠送',
      'value':'+50',
      'icon':'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'status': '07-16',
      'subtitle': '订单号：112235445565'
    },
    {
      'title':'积分抵钱',
      'value':'-500',
      'icon':'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
      'status': '07-15',
      'subtitle': '订单号：112235445565'
    },
  ]


  return (
    <div>
      {
        list1.length > 0 && list1.map((item,index) => (
          <div key={index}>
            <TitledListItem {...item} type = 'column'/>
          </div>
        ))
      }
      <div style={{ marginTop: '3em' }}>
        {
          list2.length > 0 && list2.map((item1,index) => (
            <div key={index}>
              <TitledListItem {...item1} type='line'/>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default TitledListItemShow
