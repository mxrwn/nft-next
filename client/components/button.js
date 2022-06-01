import React from 'react';
import styles from './../styles/button.module.sass'

const Button = ({children, ...props}) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
