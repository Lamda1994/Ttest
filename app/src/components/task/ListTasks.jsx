import React, {useEffect,useState} from 'react'
import Axios from '../../config';


const ListTask =()=>{

    const {task, saveTask} = useState([])

    const apiQuery = async()=>{
        const taks = await Axios.get("/api/task")
        saveTask(task.data)
        console.log(taks.data)
    }

    useEffect(()=>{
        apiQuery()
    },[])
    return(
        <h1>Hola mundo</h1>
    )
}

export default ListTask