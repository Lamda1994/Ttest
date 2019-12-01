import React, {Fragment, useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Axios from '../../config'
import Swal from 'sweetalert2'

const UpdateUser =(props)=>{

  const {id} =props.match.params

  const [user, saveUser] = useState({
    id:"",
    name:"",
    email:"",
    password:"",
    type:""
  })

  const apiQuery = async()=>{
      const users = await Axios.get(`/api/user/${id}`)
      saveUser(users.data)
      console.log(user)
  }

  const updateUser = e=>{
      e.preventDefault()
      Axios.put(`/api/user/${id}`,user)
           .then(res=>{
             Swal.fire(
               'User Updated!',
               'The user was updated successfully!',
               'success'
             )
             props.history.push("/user")
           })
  }

  useEffect(()=>{
      apiQuery()
  },[])

  const loadState = async(e)=>{
    await saveUser({
      ...user,
      [e.target.name] : e.target.value
    })
    console.log(user)
  }

  const validateForm = ()=>{
     const {id,
            name,
            email,
            password,
            type} = user
    let validate = !id.length || !name.length || !email.length || !password.length || !type.length
    return validate
  }

  return(
    <Fragment>
      <h2>Update User</h2>
      <form onSubmit={updateUser}>
        <div className="campo">
            <label>Id:</label>
            <input type="text" value={user.id} name="id" onChange={loadState}/>
        </div>

        <div className="campo">
            <label>Name:</label>
            <input type="text" value={user.name} name="name" onChange={loadState}/>
        </div>

        <div className="campo">
            <label>Email:</label>
            <input type="text" value={user.email} name="email" onChange={loadState}/>
        </div>

        <div className="campo">
            <label>Password:</label>
            <input type="password" value={user.password} name="password" onChange={loadState}/>
        </div>

        <div className="campo">
            <label>Type:</label>
            <select name="type" onChange={loadState}>
                <option value={user.type}>Select...</option>
                <option value="Normal">Normal</option>
                <option value="Admin">Administrator</option>
            </select>
        </div>

        <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Send"/>
        </div>

      </form>
    </Fragment>
  )
}

export default withRouter(UpdateUser)
