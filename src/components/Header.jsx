import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() { 
    return (
      <div className='header-container'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/create'>Create</NavLink>
      </div>
    );
  }
}
 
export default Header;