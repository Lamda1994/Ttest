import React,{useContext} from 'react'
import { Link, withRouter} from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext'

const NavBar = (props)=>{
  const [auth, saveAuth] = useContext(CRMContext)
  const singOut = ()=>{
    saveAuth({
      token:'',
      auth:false
    })

    localStorage.setItem('token', '')

    props.history.push('/')
  }

  if (!auth.auth) return null

  return(
    <aside className="sidebar col-3">
        <h2>Administration</h2>

        <nav className="navegacion">
            <Link to={"/task"} className="productos">Tasks</Link>
            <Link to={"/user"} className="clientes">Users</Link>
            <a onClick={singOut} className="pedidos" style={{cursor:'pointer'}}>Sing out</a>
        </nav>
    </aside>
)}

export default withRouter(NavBar)
