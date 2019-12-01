import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import Axios from '../../config'

const Task =({task})=>{

  const [user, saveUser] = useState([])

  const searchUser = async()=>{
      let id = task.user
      const users = await Axios.get(`/api/user/${id}`)
      saveUser(users.data)
  }

  useEffect(()=>{
      searchUser()
  },[])
  //searchUser()

  const removeTask = id=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Axios.delete(`/api/task/${id}`)
        .then(res =>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }

  return(
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.status}</td>
      <td>{task.assigned ?  user.name : "Unassigned"  }</td>
      <td>
        <Link to={`/task/edit/${task._id}`} >
            <i className="fas fa-edit fa-2x"></i>
        </Link>
        <a onClick={()=>removeTask(task._id)} style={{cursor:"pointer"}}>
            <i className="fas fa-trash-alt fa-2x"></i>
        </a>
        <Link to={`/task/assign/${task._id}`} >
            <i className="fas fa-plus-square fa-2x"></i>

        </Link>
      </td>
    </tr>
  )
}

export default Task
