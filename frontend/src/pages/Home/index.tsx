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
        styles: {
          card: { borderTop: 'none' },
          cardHeader: { border: "none", background: "#fff" },
          cardBody: { minHeight: '60vh', overflowY: "auto" as const }
        }
      }
    
  return (
    <CustomCard data={customCardProps.data} actions={customCardProps.actions} additionalComponents={customCardProps.additionalComponents} styles={customCardProps.styles}>
        <span className='text-muted'>Seja bem vindo.</span>
    </CustomCard>
  )
}
