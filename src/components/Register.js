import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Register ({ onRegister }){
  const {email,password,setEmail,setPassword}=useContext(CurrentUserContext)


  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onRegister(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Sign up</h3>
          <label className="auth-form__input">
            <input type="text" name="email" id="email" value={email || ''}
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value )} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" value={password || ''} id="password"
              className="auth-form__textfield" placeholder="Password"
              onChange={e => setPassword(e.target.value )} required  />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">Sign up</button>
          <p className="auth-form__text">Already a member? <Link className="auth-form__link" to="/signin">Log in here!</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register;