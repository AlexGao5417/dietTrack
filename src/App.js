import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Hearder'
import MHeader from './mobile_components/MHeader'
import MDateSelector from './mobile_components/MDataSelector'
import MCalPanel from './mobile_components/MCalPanel'
import PersonalInfo from './components/PersonalInfo'
import Diet from './components/DietList'
import MFoodList from './mobile_components/MFoodList'
import { Row, Affix, Button } from 'antd';


function App() {
 
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });
  
  const isMobile = (size < 800);

  const laptopDisplay = (
    <div>
      <Row>
        <Header />
      </Row>
      <div className='row'>
        <PersonalInfo />
        <Diet />
      </div>
      </div>
  )

  const mobileDisplay = (
    <div>
      
        <MHeader />
        <MDateSelector />
        <MCalPanel />
        <MFoodList />
     
    </div>
  )

  const display = isMobile ? mobileDisplay : laptopDisplay

  return (
    <div className='App'>
      {display}
      <Affix style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <Button 
          type="primary" 
          shape="circle" 
          icon="plus" 
          style={{width:'56px', height:'56px', background:'#6200ee'}}/>
      </Affix>
    </div>
  );
}

export default App;
