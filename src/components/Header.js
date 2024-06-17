import logo from '../logochecklist.png';

export const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header-logo" alt="Packing checklist logo" />
      {/* <a>Packing checklist app</a> */}
      <div className="header-nav-app">
                 
      {/* <NavLink to='/' className={getLinkClass}>
          Home
      </NavLink>
        
        <NavLink to='/form' className={getLinkClass}>
          Form
        </NavLink>
        <NavLink to='/templates' className={getLinkClass}>
          Templates
        </NavLink>
        <NavLink to='/output' className={getLinkClass}>
          Output
        </NavLink> */}
       
      
        <button className='header-button button-user-login'>Login</button>
      </div>
    </div>
  );
};
