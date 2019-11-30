import React from 'react'
import {Link} from 'react-router-dom';

const Task =({task})=>{
  return(
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.status}</td>
      <td></td>
      <td>
        <Link to={`/task/edit/${task._id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
        </Link>
        <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Cliente
        </button>
      </td>
    </tr>
  )
}

export default Task
