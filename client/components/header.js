import Image from 'next/image';
import React, { useState } from 'react';
import styles from './../sass/layout/_header.module.sass'

// LOGO
import dark_logo from './../assets/logo/rnft_1.svg'


//BULB
import dark_bulb from './../assets/bulb/lightbulb-line.svg'
import light_bulb from './../assets/bulb/lightbulb-solid.svg'
import Search from './search';

const Header = ({darkmode, toggleTheme}) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src={darkmode ? light_logo : dark_logo} height='44px' width='44px'/>
      </div>
      {/* <Search/> */}
      {/* <Switch dark={darkmode} onClick={() => toggleTheme()}/> */}
    </div>
  );
}

const Switch = ({dark, ...props}) => {
  return (
    <div className={styles.switch} {...props}>
      <div className={dark ? `${styles.bulb} ${styles.dark}` : `${styles.bulb} ${styles.light}`}>
        <Image src={dark ? dark_bulb : light_bulb}/>
      </div>
    </div>
  )
}

export default Header;
