import React, { useState } from 'react'
import PT from 'prop-types'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  // ✨ where are my props? Destructure them here

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
    isDisabled();
  }


  const onSubmit = evt => {
    evt.preventDefault()
    
    axios.post("http://localhost:9000/api/login", {username: values.username, password: values.password}) 
    .then(res => {
      localStorage.setItem("token", res.data.token)
      navigate("/articles")
    })
    .catch(err => {
      console.log(err)
    })
  }

  const isDisabled = () => {
    if(values.username.trim().length >= 3 && values.password.trim().length >= 7) {
      setDisable(false)
    } else {
      setDisable(true);
    }
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={disable} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
