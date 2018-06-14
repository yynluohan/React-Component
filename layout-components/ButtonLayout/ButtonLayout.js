import React from 'react';
import styles from './ButtonLayout.css';

const ButtonLayout = ({
  children,
  textAlign='right',
}) => {

  return (
      <div className={styles.style} style={{textAlign}}>
        {children}
      </div>
  )
}

export default ButtonLayout;
