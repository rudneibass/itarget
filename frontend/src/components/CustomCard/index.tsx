import React, { ReactNode } from 'react';
import './styles.css'

export default function Index({cardTitle, shortDescription, children }: {cardTitle: string, shortDescription: string, children: ReactNode }) {
  return (
    <div className="card" >
    <div className="card-header" style={{border: "none", background: "#fff"}}>
      <div className="container border-bottom d-flex flex-column jstify-content-center pt-3 pb-1">
        <h3 className="text-muted mb-0">{cardTitle}</h3>
        <p className="text-muted" style={{fontSize: "1.1rem"}}>{shortDescription}</p>
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
