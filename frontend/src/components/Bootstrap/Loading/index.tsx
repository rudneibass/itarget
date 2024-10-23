import svgLoadingGrayLg from './loading-gray-lg.svg'

export default function index() {
  return (
    <div 
        className="alert alert-secondary text-center" 
        style={{ 
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}
    >
      <img src={ svgLoadingGrayLg } />
    </div>
  )
}
