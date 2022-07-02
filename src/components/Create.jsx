import React from 'react';
import '../styles/Create.scss';
import Button from './Button';
import Error from './Error';
import Api from '../services/api';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker_name: '',
      email: '',
      errormsgname: '',
      errormsgemail: ''
    }
  }

  verifyErrors = () => {
    const { worker_name, email, errormsgemail, errormsgname } = this.state;
    this.setState({ errormsgname: '' });
    this.setState({ errormsgemail: '' })
    let errors = [];
    const nameError= document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    if(worker_name.length > 22) {
      const err = 'El nombre debe tener menos de 22 letras';
      errors.push(err);
      this.setState({ errormsgname: err });
    } 

    if(worker_name.length < 3) {
      const err = 'El nombre debe tener más de 3 letras';
      errors.push(err);
      this.setState({ errormsgname: err });
    }

    if(!worker_name) {
      const err = 'Campo de nombre vacío';
      errors.push(err);
      this.setState({ errormsgname: err });
    }

    if(!email.includes('.')) {
      const err = 'El mail no tiene punto';
      errors.push(err);
      this.setState({ errormsgemail: err });
    }

    if(!email.includes('@')) {
      const err = 'El mail no tiene @';
      errors.push(err);
      this.setState({ errormsgemail: err });
    }  

    if(!email) {
      const err = 'Campo de Email vacío';
      errors.push(err);
      this.setState({ errormsgemail: err });
    }

    if (errormsgname) {
      nameError.style.display = 'block';
    } else {
      nameError.style.display = 'none';
    }

    if (errormsgemail) {
      emailError.style.display = 'block';
    } else {
      emailError.style.display = 'none';
    }

    if(errors.length) return false;

  }

  changeValue = (e) => {
    const state = this.state;
    state[e.target.name]=e.target.value;
    this.setState({ state });
  }

  sendData = (e) =>{
    e.preventDefault();
    const { worker_name, email } = this.state;

    console.log('sendData()');

    this.verifyErrors();

    console.log(this.verifyErrors());

    if (this.verifyErrors() === false) {
      return false;
    } else {
      console.log('Se está haciendo el envío');

      let dataSend = {worker_name, email};
    
      fetch(Api+'?insert=1', {
        method: 'POST',
        body: JSON.stringify(dataSend)
      })
      .then(res=>res.json())
      .then(()=>{
        this.setState({ worker_name: '', email: ''});
        document.getElementById('success-text').style.display = 'block';
        document.getElementById('name-error').style.display = 'none';
        document.getElementById('email-error').style.display = 'none';
      })
      .catch(console.log)
    };
    }

  
  render() {
    
    const { worker_name, email, errormsgemail, errormsgname } = this.state;
    return (
      <div className='form-container' autoComplete='ñÖcÖmPlÉtë' spellCheck='false'>
        <h2>Ingresar un nuevo empleado</h2>
        <form onSubmit={this.sendData}>
          <div className='input-container'>
            <p>Nombre:</p>
            <input type='text' onChange={this.changeValue} name='worker_name' id='worker_name' value={worker_name} autoComplete='new-worker-name' />
            <div id='name-error'>
              <Error error={errormsgname} />
            </div>
            <small>Ej: Juan López</small>
          </div>
          <div className='input-container'>
            <p>Correo electrónico</p>
            <input type='text' onChange={this.changeValue} name='email' id='email' value={email} autoComplete='new-worker-email' />
            <div id='email-error'>
              <Error error={errormsgemail} />
            </div>
            <small>Ej: juanlopez@gmail.com</small>
          </div>
          <div className='btn-container'>
            <button type='submit'>Agregar</button>
            <Button className='cancel-btn' url='/' text='Cancelar'/>
          </div>
          <p id='success-text'>¡Agregado con éxito!</p>
        </form>
      </div>
    );
  }
}
 
export default Create;