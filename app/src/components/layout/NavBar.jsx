import React from 'react'
import { Link} from 'react-router-dom';
const NavBar = ()=>(
    <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
            <Link to={"/task"} className="clientes">Tasks</Link>
            <Link to={"/user"} className="productos">Users</Link>
            <Link to={"/"} className="pedidos">Sing out</Link>
        </nav>
    </aside>
)

export default NavBar
