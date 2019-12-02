import React,{Fragment,useState,useContext,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
import Axios from '../../config'
import { CRMContext } from '../../context/CRMContext'


const Login= (props)=>{

  const [data, saveData] = useState({})
  const [users, saveUser] = useState([])
  const [auth, saveAuth] = useContext(CRMContext)

  const apiQuery = async()=>{
        try {
          const user = await Axios.get("/api/user")
          console.log(user.data.length)
          if (!user.data.length) {
            props.history.push('/first')
          }
        }
        catch (e) {
          if(e.response.status = 500){
            props.history.push('/')
          }
        }
  }

  useEffect(()=>{
      apiQuery()
  },[])


  const LoginUser = async e =>{
    e.preventDefault()
    try {
      const res = await Axios.post('/api/user/login', data)
      const {token} = res.data
      localStorage.setItem('token', token)

      saveAuth({
        token,
        auth: true
      })

      Swal.fire(
        'Logged in',
        'The login is successful',
        'success'
      )
      props.history.push('/task')
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon:'error',
        title:'Hubo un error',
        text:err.response.data.msj
      })
    }
  }

  const ReadData = e => {
    saveData({
      ...data,
      [e.target.name] : e.target.value
    })
    console.log(data)
  }

  return(
    <Fragment>
    <div className="login">
         <h2>Iniciar Sesión</h2>

         <div className="contenedor-formulario">
             <form onSubmit={LoginUser}>
                 <div className="campo">
                     <label>Email</label>
                     <input type="text" name="email" placeholder="Email para Iniciar Sesión" required onChange={ReadData}/>
                 </div>

                 <div className="campo">
                     <label>Password</label>
                     <input type="password" name="password" placeholder="Password para Iniciar Sesión" required onChange={ReadData}/>
                 </div>

                 <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
             </form>
         </div>
     </div>
    </Fragment>
  )
}

export default withRouter(Login)
