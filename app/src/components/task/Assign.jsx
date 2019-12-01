import React, {Fragment, useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Axios from '../../config'
import Swal from 'sweetalert2'

const NewTask =(props)=>{

  const {id} =props.match.params

  var [task, saveTask] = useState({
    user:'',
    assigned:false
  })

  const [users, saveUser] = useState([])

  const apiQuery = async()=>{
      const user = await Axios.get("/api/user")
      let tasks = {
        user:'',
        assigned:true
      }
      console.log(user.data)
      saveUser(user.data)
      saveTask(tasks)
      console.log(task)
  }

  useEffect(()=>{
      apiQuery()
  },[])


  const assignUser = e=>{
    e.preventDefault()
    //console.log(task)
    Axios.put(`/api/task/assign/${id}`,task)
    .then(res =>{
      Swal.fire(
        'Task Saved!',
        'The new task was saved successfully!',
        'success'
      )
      props.history.push('/task')
    })
  }

  const loadState = e=>{
    saveTask({
      ...task,
      [e.target.name] : e.target.value
    })
    console.log(task)
  }

  return(
    <Fragment>
      <h2>Assign User</h2>
      <form onSubmit={assignUser}>
          <div className="campo">
              <label>User:</label>
              <select name="user" onChange={loadState} >
                    <option>Select...</option>
                  {
                    users.map(user=>(
                      <option key={user._id} value={user._id}>{user.name}</option>
                    ))
                  }
              </select>
          </div>

          <div className="enviar">
                  <input type="submit" className="btn btn-azul" value="Send"/>
          </div>
      </form>
    </Fragment>
  )
}

export default withRouter(NewTask)
