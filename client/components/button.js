import React from 'react';
import styles from './../styles/button.module.sass'

const Button = ({children, ...events}) => {
  return (
    <button className={styles.button} {...events}>
      {children}
    </button>
  );
}

export default Button;
