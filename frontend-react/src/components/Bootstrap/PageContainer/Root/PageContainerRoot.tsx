import { ReactNode } from 'react';
import styles from './styles.module.css'

export default function PageContainerRoot({children}: {children : ReactNode}) {
  return (
  <div className={`card ${styles.card}`} >
    {children}
  </div>
  )
}
