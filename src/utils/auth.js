import jwt from 'jsonwebtoken';

export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    if (response.status === 201){
      return response.json();
    } 
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    console.log(response.json())
    return response.json()
  })
  .then((data) => {
    console.log('this is the data'+data)
    localStorage.setItem('jwt', data.jwt)
    localStorage.setItem('email', email);
    return data;
  })
  .catch(err => console.log(err))
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => {
    if (response.status === 200){
      return response.json();
    } 
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}