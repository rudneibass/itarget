import { ReactNode } from 'react';
import styles from './styles.module.css'

type CustomCardPropsType = {
  data?: {
    title?: string | ReactNode, 
    shortDescription?: string | ReactNode,
  },
  actions?: object,
  additionalComponents?: Array<ReactNode>
  children?: ReactNode,
}

export default function Index({data, additionalComponents, children } : CustomCardPropsType) {
  return (
  <div className={`card ${styles.card}`} >

    <div className={`card-header ${styles.cardHeader}`}>
      
      <div className="border-bottom d-flex justify-content-between align-items-end pt-3 pb-3">
        <div className='d-flex'>
          
          <div className={styles.borderRight}>
            &nbsp;&nbsp;
            <span className="text-muted mb-0 border-right" style={{fontSize: "1.2rem"}}>
              {data?.title || 'Envie um título através do atributo data={{title: string}}'}          
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>

          <div className='d-flex align-items-end'>
            {data?.shortDescription || 'Envie uma descrição através do atributo data={{shortDescription: string}}'}
          </div>
          
        </div>
        
        <div className='d-flex'>
          {additionalComponents &&  additionalComponents.map((item) => (
            <div>
              {item}
            </div>
          ))}
        </div>

      </div>

    </div>

    <div className={`card-body ${styles.cardBody}`} >
      {children}
    </div>
  </div>
  )
}
