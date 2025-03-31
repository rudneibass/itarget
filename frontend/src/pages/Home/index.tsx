import { PageContainer } from '@components/Bootstrap/PageContainer'
import Icon from '@components/Bootstrap/Icon'

export default function index() {
  return (
    <>
      <PageContainer.Root>
        <PageContainer.Head 
          title='Home' 
          shortDescription= {<Icon name="bi bi-house text-muted" size={16} />}
        />
        <PageContainer.Boddy>
          <span className='text-muted'>
            Seja bem vindo.
          </span>
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
