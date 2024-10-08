import { CSSProperties, ReactNode } from 'react';
//import styles from './styles.module.scss';

type CustomCardPropsType = {
  data?: {
    title?: string | ReactNode, 
    shortDescription?: string | ReactNode,
  },
  actions?: object,
  additionalComponents?: Array<ReactNode>
  children?: ReactNode,
  styles?: {
    card?: CSSProperties,
    cardHeader?: CSSProperties,
    cardBody?: CSSProperties
  }
}

export default function Index({data, additionalComponents, children, styles } : CustomCardPropsType) {
  return (
    <div className={`card`} style={styles?.card ? styles.card : {}} >
    
    <div className="card-header" style={styles?.cardHeader ? styles.cardHeader : {}}>
      
      <div className="border-bottom d-flex justify-content-between align-items-end pt-3 pb-3">
        <div className='d-flex'>
          
          <div style={{borderRight: "1px solid #dee2e6"}}>
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

    <div className={`card-body`} style={styles?.cardBody ? styles.cardBody : {}} >
      {children}
    </div>
  </div>
  )
}
