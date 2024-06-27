import { ReactNode } from 'react';
import styles from './styles.module.scss';

type CustomCardPropsType = {
    title: string, 
    shortDescription: string,
}

export default function Index({data, children } : {data: CustomCardPropsType, children: ReactNode }) {
  return (
    <div className={`${styles.card} card`}>
    <div className="card-header" style={{border: "none", background: "#fff"}}>
      <div className="container border-bottom d-flex flex-column jstify-content-center pt-3 pb-1">
        <h3 className="text-muted mb-0">{data.title}</h3>
        <p className="text-muted" style={{fontSize: "1.1rem"}}>{data.shortDescription}</p>
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
