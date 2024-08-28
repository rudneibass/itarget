import svgLoadingGrayLg from './loading-gray-lg.svg'

export default function index() {
  return (
    <div 
        className="alert alert-secondary text-center" 
        style={{ 
            position: 'absolute', 
            height: '90%', 
            width: '97%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}
    >
      <img src={ svgLoadingGrayLg } />
    </div>
  )
}
