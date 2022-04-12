import React,{useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import '../blocks/login/login.css';

function Login ({ onLogin }){
 const {email,password,setEmail,setPassword}=useContext(CurrentUserContext)


  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Log in</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email" value={email || ''}
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value )} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" value={password ||''} name="password" id="password"
              className="auth-form__textfield" placeholder="Password"
              onChange={e => setPassword(e.target.value )} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login;