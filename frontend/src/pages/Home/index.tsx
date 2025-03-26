import CustomCard from '@components/Bootstrap/CustomCard'

export default function index() {
    const customCardProps = {
        data: {
          title:'Home', 
          shortDescription:
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fs-7 bi-house"></i>&nbsp;&nbsp;
          </>
        },
        actions: {},
        additionalComponents: [],
      }
    
  return (
    <>
      <CustomCard 
        data={customCardProps.data} 
        actions={customCardProps.actions} 
        additionalComponents={customCardProps.additionalComponents}
      >
          <span className='text-muted'>Seja bem vindo.</span>
      </CustomCard>
    </>
  )
}
