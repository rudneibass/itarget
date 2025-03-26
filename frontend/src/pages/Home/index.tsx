import { PageContainer } from '@components/Bootstrap/PageContainer'

export default function index() {
  return (
    <>
      <PageContainer.Root>
        <PageContainer.Head 
          title='Formulários' 
          shortDescription={
            <>
              <i className="fs-7 bi-house"></i>&nbsp;&nbsp;
              <small className="text-muted" >
               {'> Cadastros > Formulários'}
              </small> 
            </>
          }
        />
        <PageContainer.Boddy>
          <span className='text-muted'>Seja bem vindo.</span>
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
