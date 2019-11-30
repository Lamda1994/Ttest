import React, {Fragment, useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Axios from '../../config'
import Swal from 'sweetalert2'

const UpdateTask =(props)=>{

  const {id} =props.match.params

  const [tasks, saveTask] = useState({
    title:'',
    description:''
  })

  const apiQuery = async()=>{
      const task = await Axios.get(`/api/task/${id}`)
      saveTask(task.data)
      console.log(task)
  }

  const updateTask = e=>{
      e.preventDefault()
      Axios.put(`/api/task/${id}`,tasks)
           .then(res=>{
             console.log(res)
             props.history.push("/task")
           })
  }

  useEffect(()=>{
      apiQuery()
  },[])

  const loadState = e=>{
    saveTask({
      ...tasks,
      [e.target.name] : e.target.value
    })
    console.log(tasks)
  }

  const validateForm = ()=>{
    const {title, description} = tasks
    let validate = !title.length || !description.length
    return validate
  }

  return(
    <Fragment>
      <h2>New Task</h2>
      <form onSubmit={updateTask}>
          <div className="campo">
              <label>Title:</label>
              <input type="text" placeholder="Insert a title for the task" name="title" onChange={loadState} value={tasks.title}/>
          </div>
          <div className="campo">
              <label>Status:</label>
              <select name="status" onChange={loadState}>
                  <option value={tasks.status}>Select..</option>
                  <option value="Open">Open</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
              </select>
          </div>

          <div className="campo">
              <label>Description:</label>
              <textarea cols="90" rows="20"  placeholder="Insert a short description of the task" name="description" onChange={loadState} defaultValue = {tasks.description}></textarea>
          </div>

          <div className="enviar">
                  <input type="submit" className="btn btn-azul" value="Send" disabled={validateForm()}/>
          </div>

      </form>
    </Fragment>
  )
}

export default withRouter(UpdateTask)
