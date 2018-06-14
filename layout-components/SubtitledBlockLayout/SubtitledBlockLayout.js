import React from 'react';
import styles from './SubtitledBlockLayout.css';

const SubtitledBlockLayout = ({
  children,
  title,
  subTitle,
  style=styles.style,     //外框样式
  outStyle=styles.outStyle,
  titleStyle = styles.titleStyle,  //主标题样式
  subTitleStyle = styles.subTitleStyle, //副标题样式
  childrenStyle=styles.childrenStyle,
}) => {

  return (
    <div className={style}>
      <ul className={outStyle}>
        <li className={titleStyle}>{title}</li>
        <li className={subTitleStyle}>{subTitle}</li>
      </ul>
      <div className={childrenStyle}>{children}</div>
    </div>
  );
};

SubtitledBlockLayout.PropTypes ={
};

export default SubtitledBlockLayout;
