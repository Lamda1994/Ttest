import React, {Fragment, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Axios from '../../config'
import Swal from 'sweetalert2'

const FirstUser =({history})=>{

  const [user, saveUser] = useState({
    id:"",
    name:"",
    email:"",
    password:""
  })

  const loadState = e=>{
    saveUser({
      ...user,
      [e.target.name] : e.target.value
    })
    console.log(user)
  }

  const validateForm = ()=>{
     const {id,
            name,
            email,
            password} = user
    let validate = !id.length || !name.length || !email.length || !password.length
    return validate
  }

  const addUser = e=>{
    e.preventDefault()
    Axios.post('/api/user',user)
    .then(res =>{
      Swal.fire(
        'User Saved!',
        'The new user was saved successfully!',
        'success'
      )
      history.push('/')
    })
  }

  return(
    <Fragment>
      <h2>New User</h2>
      <form onSubmit={addUser}>
          <div className="campo">
              <label>Id:</label>
              <input type="text" placeholder="Enter your identification number." name="id" onChange={loadState}/>
          </div>

          <div className="campo">
              <label>Name:</label>
              <input type="text" placeholder="Insert your name" name="name" onChange={loadState}/>
          </div>

          <div className="campo">
              <label>Email:</label>
              <input type="text" placeholder="Insert your Email" name="email" onChange={loadState}/>
          </div>

          <div className="campo">
              <label>Password:</label>
              <input type="password" placeholder="Insert your password" name="password" onChange={loadState}/>
          </div>

          <div className="enviar">
                  <input type="submit" className="btn btn-azul" value="Send" disabled={validateForm()}/>
          </div>
      </form>
    </Fragment>
  )
}

export default withRouter(FirstUser)
