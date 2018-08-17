import React from 'react';
import CommentListItem from '../components/commentListItem/CommentListItem'

const CommentItemShow = ({

}) => {

  const config = {
    icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
    name: '若寒',
    commentName: '',
    content: '设计费号待审核分开连锁店GV地方GV看是',
    API: '',
    subtitle:'7-20 17:20'
  }

  const commentListItemProps = {
    ...config
  }

  return (
    <div>
      <CommentListItem {...commentListItemProps}/>
    </div>
  )
}

export default CommentItemShow;
