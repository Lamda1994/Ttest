import React from 'react'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import Axios from '../../config'

const User =({user})=>{

  const removeUser = id=>{
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
        Axios.delete(`/api/user/${id}`)
        .then(res =>{
          Swal.fire(
            'Deleted!',
            'The user was successfully deleted..',
            'success'
          )
        })
      }
    })
  }

  return(
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>{user.status}</td>
      <td>
        <Link to={`/user/edit/${user._id}`} >
            <i className="fas fa-edit fa-2x"></i>
        </Link>
        <a onClick={()=>removeUser(user._id)} style={{cursor:"pointer"}}>
            <i className="fas fa-trash-alt fa-2x"></i>
        </a>
      </td>
    </tr>
  )
}

export default User
