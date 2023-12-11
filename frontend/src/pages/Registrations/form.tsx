import React, { ChangeEvent, FormEvent, useState } from 'react'
import CustomCard from '../../components/CustomCard'
import { Link } from 'react-router-dom'
import svgLoadingWhite from '../../assets/loading-white-sm.svg'
import { useParams } from "react-router-dom";
import { apiRegistrations } from '../../services/apiRegistrations';

import { toastContainer, errorAlert, successAlert } from '../../components/ToastifyAlerts'
import { registrationsValidate } from './formValidate';

type Inputs = {
  name: string;
  email: string;
  cpf: string;
  event_id?: string
};

export default function Index() {
  const [loading, setLoading] = useState(false)
  const { eventId } = useParams();
  const [inputs, setInputs] = useState<Inputs>({} as Inputs);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  }

 async function handleSibmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = inputs
    data.event_id = eventId
    
    const formValid = registrationsValidate(data)

    if(!formValid){
      return
    }


    setLoading(true)
    const response = await apiRegistrations.store(data)
      
      if(response.length === 0){
        errorAlert('Erro ao tentar realizar a inscrição., tente novamente mais tarde.')
        setLoading(false)
        return
      }
    
      successAlert('Inscrição efetuada com sucesso!')
      setLoading(false)
     
      return
  }
 
  return (
    <div>
      {toastContainer}
       <CustomCard cardTitle='Inscrições' shortDescription='Listagem de inscrições'>
          <section>
            <form action="" onSubmit={handleSibmit}>
              <div className="row">
                
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="email">Name *</label>
                    <input 
                      type="text" 
                      className="form-control"  
                      id="name" 
                      name="name" 
                      value={inputs.name}
                      onChange={handleChange}/>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email *</label>
                    <input 
                      type="text" 
                      className="form-control"  
                      id="email" 
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="cpf">CPF *</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="cpf" 
                        name="cpf"
                        value={inputs.cpf}
                        onChange={handleChange}
                      />
                  </div>
                </div>
                    

                <div className="col-md-12 d-flex justify-content-end pt-4 mt-5 border-top">
                  
                  <Link to="/" className="btn btn-outline-secondary">
                    <i className="fs-7 bi-back"></i> Voltar
                  </Link>
                  &nbsp;

                  {!loading && (
                    <button type="submit" className="btn btn-secondary" style={{minWidth: '100px'}}>
                      <i className="fs-7 bi-save"></i> Salvar
                    </button>
                  )}

                  {loading && (
                    <button className="btn btn-secondary" style={{minWidth: '100px'}}>
                      <img src={svgLoadingWhite} />
                    </button>
                  )}
                  
                </div>
              </div>
            </form>
          </section>
        
        </CustomCard>
    </div>
  )
}
