import React, {Fragment, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Axios from '../../config'
import Swal from 'sweetalert2'

const NewTask =({history})=>{

  const [task, saveTask] = useState({
    title:'',
    description:''
  })

  const loadState = e=>{
    saveTask({
      ...task,
      [e.target.name] : e.target.value
    })
    console.log(task)
  }

  const validateForm = ()=>{
    const {title, description} = task
    let validate = !title.length || !description.length
    return validate
  }

  const addTask = e=>{
    e.preventDefault()
    Axios.post('/api/task',task)
    .then(res =>{
      Swal.fire(
        'Good job!',
        'You clicked the button!',
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
