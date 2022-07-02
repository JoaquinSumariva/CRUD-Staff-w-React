import React from 'react';
import List from './List';
import '../styles/ListContainer.scss';
import Button from './Button';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() { 
    return (
      <div className='list-container'>
        <div>
          <Button
            url='/create'
            className='addWorker'
            text='Agregar un empleado' />
        </div>
        <List />
      </div>
    );
  }
}
 
export default ListContainer;