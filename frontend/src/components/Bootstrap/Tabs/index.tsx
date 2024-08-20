import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Index() {
  return (
    <>
      <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify >
        <Tab eventKey="home" title="Home" className='border'>
          Home
        </Tab>
            
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>

        <Tab eventKey="longer-tab" title="Loooonger Tab">
          Tab content for Loooonger Tab
        </Tab>
      </Tabs>
    </>
  )
}
