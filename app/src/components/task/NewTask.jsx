import React, {Fragment, useState, useEffect, useContext} from 'react'
import { CRMContext } from '../../context/CRMContext'
import {withRouter} from 'react-router-dom'
import Axios from '../../config'
import Swal from 'sweetalert2'

const NewTask =({history})=>{

  const [task, saveTask] = useState({
    title:'',
    description:''
  })
  const [users, saveUser] = useState([])
  const [auth, saveAuth] = useContext(CRMContext)

  const apiQuery = async()=>{

      if (auth.token != '') {
        try {
          const user = await Axios.get("/api/user")
          console.log(user.data)
          saveUser(user.data)
        }
        catch (e) {
          if(e.response.status = 500){
            history.push('/')
          }
        }
      }else{
        history.push('/')
      }
  }

  useEffect(()=>{
      apiQuery()
  },[])

  const loadState = e=>{
    saveTask({
      ...task,
      [e.target.name] : e.target.value
    })
    console.log(task)
  }

  const validateForm = ()=>{
    const {title, description, user} = task
    let validate = !title.length || !description.length
    return validate
  }

  const addTask = e=>{
    e.preventDefault()
    //console.log(task)
    Axios.post('/api/task',task)
    .then(res =>{
      Swal.fire(
        'Task Saved!',
        'The new task was saved successfully!',
        'success'
      )

      history.push('/task')
    })
  }

  return(
    <Fragment>
      <h2>New Task</h2>
      <form onSubmit={addTask}>
          <div className="campo">
              <label>Title:</label>
              <input type="text" placeholder="Insert a title for the task" name="title" onChange={loadState}/>
          </div>
          <div className="campo">
              <label>Description:</label>
              <textarea cols="90" rows="20"  placeholder="Insert a short description of the task" name="description" onChange={loadState}></textarea>
          </div>

          <div className="enviar">
                  <input type="submit" className="btn btn-azul" value="Send" disabled={validateForm()}/>
          </div>

      </form>
    </Fragment>
  )
}

export default withRouter(NewTask)
