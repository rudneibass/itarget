import React from 'react'
import formJpg from '../assets/form.jpg'

export default function Index() {
  return (
    <div className="alert alert-warning">
      <h5 className="text-muted"> 
        Welcome to the Form component!
      </h5>
      <span className="text-muted">
        Please, send an array of objects with input information in the format:
      </span>
      <br/>
      <small className="text-muted">
        id: string,<br/>
        form_id: string,<br/>
        attributes: object<br/>
      </small>
      <br/>
      <span className="text-muted">
        Usage exemple:
      </span><br/><br/>
      <img src={formJpg} />
    </div>
  )
}
