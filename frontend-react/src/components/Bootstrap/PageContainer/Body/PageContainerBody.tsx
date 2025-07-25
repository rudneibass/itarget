import { ReactNode } from 'react';
import styles from './styles.module.css'

export default function PageContainerBody({children} : {children : ReactNode}) {
  return (
    <div className={`card-body ${styles.cardBody}`} >
      {children}
    </div>
  )
}
