import React, {useEffect,useState,Fragment,useContext} from 'react'
import {Link, withRouter} from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext'
import Axios from '../../config'
import Task from './Task'


const ListTask =(props)=>{

    const [tasks, saveTask] = useState([])
    const [list, saveList] = useState([])
    const [auth, saveAuth] = useContext(CRMContext)

    const apiQuery = async()=>{
        if (auth.token != '') {
          try {
            const task = await Axios.get("/api/task")
            saveTask(task.data)
          }
          catch (e) {
            if(e.response.status = 500){
              props.history.push('/')
            }
          }
        }else{
          props.history.push('/')
        }
    }

    useEffect(()=>{
        apiQuery()
    },[tasks])

    if(!auth.auth){
      props.history.push('/')
    }
    
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
                tasks.length ? (tasks.map(task=>( 
                  <Task
                    key={task._id}
                    task={task}
                  />
                )
              )) : (
                <tr><td colSpan="5">No records</td></tr>
              )
            }
          </tbody>
        </table>
      </Fragment>
    )
}

export default withRouter(ListTask)
