import React, {useEffect,useState,Fragment} from 'react'
import {Link} from 'react-router-dom';
import Axios from '../../config'
import User from './User'


const ListUser =()=>{

    const [users, saveUser] = useState([])

    const apiQuery = async()=>{
        const user = await Axios.get("/api/user")
        console.log(user.data)
        saveUser(user.data)
    }

    useEffect(()=>{
        apiQuery()
    },[])

    return(
      <Fragment>
        <h2>Users List</h2>
        <Link to={"/user/new"}> <i className="fas fa-plus-circle fa-2x"></i>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user=>(
                <User
                  key={user._id}
                  user={user}
                />
              ))
            }
          </tbody>
        </table>
      </Fragment>
    )
}

export default ListUser
