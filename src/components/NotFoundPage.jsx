import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.scss';

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() { 
    return (
      <div className='not_found_page-container'>
        <h3>No se encontró esta dirección</h3>
        <Link to='/' className='not_found_page-link'>Puedes regresar al inicio</Link>
      </div>
    );
  }
}
 
export default NotFoundPage;