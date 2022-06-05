import { faCompass, faDashboard, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './../sass/layout/_nav.module.sass'
import Link from 'next/link'

const Nav = ({toggleActive, activeDashboard}) => {
  return (
    <div className={styles.nav}>
      <Icon icon={faDashboard} link='/' onClick={() => toggleActive()} active={activeDashboard}/>
      <Icon icon={faHome} link='/'/>
      <Icon icon={faSearch} link='/search'/>
      <Icon icon={faCompass} link='/explore'/>
    </div>
  );
}

const Icon = ({icon, link, active, ...events}) => {
  return (
    <Link href={link}>
    <div className={active ? `${styles.icon} ${styles.active}` : styles.icon }  {...events}>
      <FontAwesomeIcon icon={icon}/>
    </div>
    </Link>
    
  )
}

export default Nav;
