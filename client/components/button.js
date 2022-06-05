import React from 'react';
import styles from './../sass/components/_button.module.sass'

const Button = ({children, ...props}) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
