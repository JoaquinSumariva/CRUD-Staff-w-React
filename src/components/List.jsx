import React from 'react';
import '../styles/List.scss';
import Button from './Button';
import Loading from './Loading';
import Api from '../services/api';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      staff: []
    }
  }

  deleteWorker = (id) => {
    fetch(Api+'?delete='+id)
      .then(res=>res.json())
      .then(()=>{
        this.loadInfo();
      })
      .catch(console.log)
  };

  loadInfo(){
    fetch(Api)
      .then(res=>res.json())
      .then((dataRes)=>{
        this.setState({ dataLoaded: true, staff: dataRes})
      })
      .catch(console.log)
  }

  componentDidMount(){
    this.loadInfo();
  }
  
  render() {
    const{dataLoaded, staff}=this.state;

    if(!dataLoaded){ return(<Loading />)}
    else {
      return (
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            staff.map(
              (worker)=>(
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.worker_name}</td>
                  <td>{worker.email}</td>
                  <td className='btn-container'>
                    <Button
                      url={'/edit/'+worker.id}
                      className='action-button'
                      text='Editar' />
                    <button type='button' onClick={()=> this.deleteWorker(worker.id)}>Borrar</button>
                  </td>
                </tr>
              )
            )
          }
          
        </tbody>
      </table>
    );
  }
}
}
 
export default List;