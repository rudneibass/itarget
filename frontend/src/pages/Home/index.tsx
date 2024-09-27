import CustomCard from '@components/Bootstrap/CustomCard'
import InputSelectSearchable from '@components/Bootstrap/Form/InputSelectSearchable'

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
    
    const InputSelectSearchableProps = {
      data: {
        id: '1',
        dataSource: 'http://127.0.0.1:8000/api/registration/search',
        attributes: {
          name: 'input-name',
          id: 'input_id',
          label: 'Label'
        }
      },
    }
  return (
    <CustomCard data={customCardProps.data} actions={customCardProps.actions} additionalComponents={customCardProps.additionalComponents} styles={customCardProps.styles}>
        <span className='text-muted'>Seja bem vindo.</span>
        <InputSelectSearchable data={InputSelectSearchableProps.data} />
    </CustomCard>
  )
}
