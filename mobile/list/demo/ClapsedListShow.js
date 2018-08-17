import React from 'react';
import ClapsedList from '../components/clapsedList/ClapsedList';

const ClapsedListShow = ({

}) => {

  const list = [
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

  const clapsedListProps = {
    list,
  }

  return (
    <div>
      <ClapsedList {...clapsedListProps}/>
    </div>
  )
}


export default ClapsedListShow;
