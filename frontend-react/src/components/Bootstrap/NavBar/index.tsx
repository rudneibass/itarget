export default function Index() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <div 
        className="container-fluid" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <i className='fs-6 bi-list'></i>&nbsp;
          <span>Admin</span>
        </div>
        <div className="text-muted">
          <i className='fs-6 bi-person-circle'></i>&nbsp;
          <small>userconectes@servicemail.com</small>
        </div>
      </div>
    </nav>
  )
}
