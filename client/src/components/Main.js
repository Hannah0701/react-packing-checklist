export const Main = (props) => {
  return (
    <div className="main">
      <div className="main-image-header">
        <h1>Packing Checklist Generator</h1>
        <p>Generate a bespoke checklist for your holiday based on your details or choose from one of our preset templates!</p>
      </div>
      <div className="main-box">
        <div className='bespoke-checklist-box'>
          <button className="bespoke-box-button" onClick={() => props.setIsBespokePage(true)}></button>
        </div>
        <div className='preset-checklists-box'>
          <button className="preset-box-button" onClick={() => props.setIsTemplatesPage(true)}></button>
        </div>
      </div>
    </div>
  );
}
