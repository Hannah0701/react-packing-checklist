import './App.css';
import React, { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Form } from './components/Form';
import { Templates } from './components/Templates';
import { Output } from './components/Output';
import { Footer } from './components/Footer';

function App() {
  const [isBespokePage, setIsBespokePage] = useState(false);
  const [isTemplatesPage, setIsTemplatesPage] = useState(false);
  const [isOutputPage, setIsOutputPage] = useState(false);
  const [sharedData, setSharedData] = useState(null);

  function goHome() {
    setIsBespokePage(false)
    setIsTemplatesPage(false)
    setIsOutputPage(false)
    setSharedData(null)
  }

  useEffect(() => {
    if (isBespokePage) {
      document.title = `Bespoke Packing Checklist Form`
    } else if (isTemplatesPage) {
      document.title = 'Preset Packing Checklist Templates'
    } else if (isOutputPage) {
      document.title = 'Generated Packing Checklist'
    } else {
      document.title = 'Packing Checklist Homepage'
    }
  }, [isBespokePage, isTemplatesPage, isOutputPage])

  
  if (isBespokePage) {
    return (
      <div className="App">
        <Header />
        <Form  
          goHome={goHome} 
          setIsBespokePage={setIsBespokePage}
          setIsOutputPage={setIsOutputPage}
          setSharedData={setSharedData}
        />
        <Footer />
      </div>
    )
  }
  
  if (isTemplatesPage) {
    return (
      <div className="App">
        <Header />
        <Templates  
          goHome={goHome} 
          setIsTemplatesPage={setIsTemplatesPage}
          setIsOutputPage={setIsOutputPage}
          setSharedData={setSharedData}
        />
        <Footer />
      </div>
    )
  }

  if (isOutputPage) {
    return (
      <div className="App">
        <Header />
        <Output  
          goHome={goHome}
          sharedData={sharedData}
        />
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="App">
      <Header />
      <Main
        setIsBespokePage={setIsBespokePage}
        setIsTemplatesPage={setIsTemplatesPage}
      />
      <Footer />
    </div>
  );
}

export default App;
