import React from 'react'
import animation from './../assets/animation.gif'
import styles from './../sass/components/_loading.module.sass'

export default function LoadingAnimation() {
  return (
    <div className={styles.loadingAnimation}>
      <img src={animation.src}/>
    </div>
    
  )
}
