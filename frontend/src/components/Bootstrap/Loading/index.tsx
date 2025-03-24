import svgLoadingGrayLg from './loading-gray-lg.svg'

export default function index({ isLoading } : { isLoading: boolean }) {
  return isLoading && (
        <div 
          className="alert text-center" 
          style={{ 
            backgroundColor: 'rgba(0,0,0, .2)',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          
            width: '100%',
            height: '100%',
            zIndex: '999',

            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
          }}
      >
        <img src={ svgLoadingGrayLg } />
      </div>
    )

}
