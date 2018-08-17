import React from 'react';
import BlogListItem from '../components/blogListItem/BlogListItem';

const BlogListItemShow = ({

}) => {

  const config = {
    id: '002',
    icon: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
    name: '若寒',
    subtitle:'今天10:39',
    content: '她们都是从小“美”到大的美人胚子，很多人的美，从小就注定。你知道吗？最近一个8岁...',
    lives: [
        {
          url: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
        },
        {
          url: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
        },
        {
          url: 'http://img.19196.com/uploads/151125/9-151125103F5930.jpg',
        }
    ],
    tags:[
        {
          tagName: '#美白#',
        },
        {
          tagName: '#祛痘#',
        },
        {
          tagName: '#润湿护肤#'
        }
    ],
    stats:[
        {
          icon: 'https://img.xiaopiu.com/userImages/img2558163f2b57f78.png',
          record: 22222
        },
        {
          icon:'https://img.xiaopiu.com/userImages/img2558163f2b57f78.png',
          record: 336555
        }
    ],
    route: '/contentListItemShow'

  }

  const blogListItemProps = {
    ...config
  }

  return (
    <div>
      <BlogListItem {...blogListItemProps}/>
    </div>
  )

}

export default BlogListItemShow;
