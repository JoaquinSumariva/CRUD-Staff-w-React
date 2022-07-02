import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from './Button';
import Api from '../services/api';
import Error from "./Error";

export default function Edit(){

  let navigate = useNavigate();
  const { id } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [worker, setWorker] = useState();
  const [worker_name, setWorker_name] = useState('');
  const [worker_email, setEmail] = useState('');
  const [errormsgname, setErrormsgname] = useState('');
  const [errormsgemail, setErrormsgemail] = useState('');
  

  useEffect(()=>{
    fetch(Api+'?consult='+id)
      .then(res=>res.json())
      .then((dataRes)=>{
        setWorker(dataRes)
        setDataLoaded(true);
        setWorker_name(dataRes[0].worker_name);
        setEmail(dataRes[0].email);
      })
      .catch(console.log)
  }, [useState])

  const changeValueName = e =>{
    setWorker_name(e.target.value);
  };
  
  const changeValueEmail = e =>{
    setEmail(e.target.value);
  };

  const verifyErrors = () =>{
    setErrormsgname('');
    setErrormsgemail('');
    let errors = [];
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    if(worker_name.length > 22) {
      const err = 'El nombre debe tener menos de 22 letras';
      errors.push(err);
      setErrormsgname(err);
    } 

    if(worker_name.length < 3) {
      const err = 'El nombre debe tener más de 3 letras';
      errors.push(err);
      setErrormsgname(err);
    }

    if(!worker_name) {
      const err = 'Campo de nombre vacío';
      errors.push(err);
      setErrormsgname(err);
    }

    if(!worker_email.includes('.')) {
      const err = 'El mail no tiene punto';
      errors.push(err);
      setErrormsgemail(err);
    }

    if(!worker_email.includes('@')) {
      const err = 'El mail no tiene @';
      errors.push(err);
      setErrormsgemail(err);
    }  

    if(!worker_email) {
      const err = 'Campo de Email vacío';
      errors.push(err);
      setErrormsgemail(err);
    }

    if (errormsgname !== '') {
      nameError.style.display = 'block';
    } else {
      nameError.style.display = 'none';
    }

    if (errormsgemail !== '') {
      emailError.style.display = 'block';
    } else {
      emailError.style.display = 'none';
    }

    if(errors.length) return false;
  };

  const sendData = e => {
    e.preventDefault();

    verifyErrors();

    if (verifyErrors() === false) {
      return false;
    } else {
      var workerUpdate = {id, worker_name, email: worker_email};

      fetch(Api+'?update=1',{
        method: 'POST',
        body: JSON.stringify(workerUpdate)
      })
        .then(res=>res.json())
        .then(()=>{
          navigate('/');
        })
    }
    
  }
  if(!dataLoaded) return <div>Cargando</div>
  else {
    return (
      <div className='form-container' autoComplete='off' spellCheck='false'>
          <h2>Usuario N°{worker[0].id}</h2>
          <form onSubmit={sendData}>
            <input type="hidden" name="id" value={worker[0].id} />
            <div className='input-container'>
              <p>Nombre:</p>
              <input type='text' onChange={changeValueName} name='worker_name' value={worker_name} />
              <div id='name-error'>
                <Error error={errormsgname} />
              </div>
              <small>Ej: Juan López</small>
            </div>
            <div className='input-container'>
              <p>Correo electrónico</p>
              <input type='text' onChange={changeValueEmail} name='email' value={worker_email} />
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