import { ReactNode } from 'react'
import styles from './styles.module.css'

export default function PageContainerHead({title, shortDescription, children} : {title?: string, shortDescription?:string | ReactNode, children?: ReactNode}) {
  return (
    <div className={`card-header ${styles.cardHeader}`}>
      <div className="border-bottom d-flex justify-content-between align-items-end pt-3 pb-3">
        <div className='d-flex'>
          <div className={styles.borderRight}>
            &nbsp;&nbsp;
            <span className="text-muted mb-0 border-right" style={{fontSize: "1.2rem"}}>
              {title || 'Envie um título através do atributo data={{title: string}}'}
            </span>
            &emsp;
          </div>
          &emsp;
          <div className='d-flex align-items-end'>
            {shortDescription || 'Envie uma descrição através do atributo {shortDescription: string}'}
          </div>
        </div>
        <div className='d-flex'>
          {children || ''}
        </div>
      </div>
    </div>
  )
}
