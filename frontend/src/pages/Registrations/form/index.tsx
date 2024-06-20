import { ChangeEvent, FormEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import CustomCard from '@components/CustomCard'
import { toastContainer, errorAlert, successAlert } from '@components/ToastifyAlerts'
import svgLoadingWhite from '@assets/loading-white-sm.svg'
import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'
import { validate } from './validatetions'
import useRegistrationFormContext from './context'


export default function Index() {
  const context = useRegistrationFormContext()
  const { eventId } = useParams();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    context.setInputsContext({[name]: value})
  }

 async function handleSibmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const inputs = context.inputs
    inputs.event_id = eventId
    if(!validate(inputs)){
      return
    }

    context.setLoadingContext(true)
    const response = await registrationApi.create(`${endpoints.registration.endpoint}${endpoints.registration.actions.create}`, inputs)
      
    if(response.length === 0){
      errorAlert('Erro ao tentar realizar a inscrição, tente novamente mais tarde.')
      context.setLoadingContext(false)
      return
    }
    
    successAlert('Inscrição efetuada com sucesso!')
    context.setLoadingContext(false)
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
                      value={context.inputs.name}
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
                      value={context.inputs.email}
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
                        value={context.inputs.cpf}
                        onChange={handleChange}
                      />
                  </div>
                </div>
                    

                <div className="col-md-12 d-flex justify-content-end pt-4 mt-5 border-top">
                  
                  <Link to="/" className="btn btn-outline-secondary">
                    <i className="fs-7 bi-back"></i> Voltar
                  </Link>
                  &nbsp;

                  {!context.loading && (
                    <button type="submit" className="btn btn-secondary" style={{minWidth: '100px'}}>
                      <i className="fs-7 bi-save"></i> Salvar
                    </button>
                  )}

                  {context.loading && (
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
