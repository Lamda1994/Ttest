import React, {useEffect,useState,Fragment} from 'react'
import {Link} from 'react-router-dom';
import Axios from '../../config'
import Task from './Task'


const ListTask =()=>{

    const [tasks, saveTask] = useState([])

    const apiQuery = async()=>{
        const task = await Axios.get("/api/task")
        saveTask(task.data)
    }

    useEffect(()=>{
        apiQuery()
    },[tasks])

    return(
      <Fragment>
        <h2>Tasks List</h2>
        <Link to={"/task/new"}>
          <i className="fa fa-plus-circle fa-2x"></i>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map(task=>(
                <Task
                  key={task._id}
                  task={task}
                />
              ))
            }
          </tbody>
        </table>
      </Fragment>
    )
}

export default ListTask
