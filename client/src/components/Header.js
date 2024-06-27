import logo from '../assets/logochecklist.png';

export const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header-logo" alt="Packing checklist logo" />
      <div className="header-nav-app">
      
        <button className='header-button button-user-login'>Login</button>
      </div>
    </div>
  );
};
