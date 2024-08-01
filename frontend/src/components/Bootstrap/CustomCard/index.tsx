import { ReactNode } from 'react';
import styles from './styles.module.scss';

type CustomCardPropsType = {
  data?: {
    title?: string, 
    shortDescription?: string,
  },
  actions?: object,
  additionalComponents?: Array<ReactNode>
  children?: ReactNode
}

export default function Index({data, children } : CustomCardPropsType) {
  return (
    <div className={`${styles.card} card`}>
    <div className="card-header" style={{border: "none", background: "#fff"}}>
      <div className="container border-bottom d-flex flex-column jstify-content-center pt-3 pb-1">
        <h3 className="text-muted mb-0">
          {data?.title || 'Envie um título através do atributo data={{title: string}}'}
        </h3>
        <p className="text-muted" style={{fontSize: "1.1rem"}}>
          {data?.shortDescription || 'Envie uma descrição através do atributo data={{shortDescription: string}}'}
        </p>
      </div>
    </div>
    <div className="card-body">
      <div className="container">
        {children}
      </div>
    </div>
  </div>
  )
}
