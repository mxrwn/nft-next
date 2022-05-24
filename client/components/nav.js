import { faCompass, faDashboard, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './../styles/nav.module.sass'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Icon icon={faDashboard} link='/'/>
      <Icon icon={faHome} link='/'/>
      <Icon icon={faSearch} link='/search'/>
      <Icon icon={faCompass} link='/explore'/>
    </div>
  );
}

const Icon = ({icon, link}) => {
  return (
    <Link href={link}>
    <div className={styles.icon}>
      <FontAwesomeIcon icon={icon}/>
    </div>
    </Link>
    
  )
}

export default Nav;
