import React, {useEffect,useState,Fragment,useContext} from 'react'
import {Link, withRouter} from 'react-router-dom';
import Axios from '../../config'
import User from './User'
import { CRMContext } from '../../context/CRMContext'

const ListUser =(props)=>{

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
              props.history.push('/')
            }
          }
        }else{
          props.history.push('/')
        }
    }
    useEffect(()=>{
        apiQuery()
    },[users])

    if(!auth.auth){
      props.history.push('/')
    }
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

export default withRouter(ListUser)
