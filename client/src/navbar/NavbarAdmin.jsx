import React, { useContext } from 'react'
import iconProfile from '../assets/iconProfile.png'
import iconLogout from '../assets/iconLogout.png'
import styleModuleLogin from '../pages/Page1.module.css'
import Header from '../assets/Header.png'
import add1 from '../assets/add (1).png'
import Profile from '../assets//Rectangle 12.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../context/userContext'
import swal from 'sweetalert'
import admin from '../assets/support-services.png'
import { NavDropdown } from "react-bootstrap"



function NavbarAdmin() {

    const navigate = useNavigate()
    const [down, setDown] = useState()
    const [state, dispatch] = useContext(UserContext);



    const Admin = () => {
        navigate("/Admin")
    }

    const Home = () => {
        navigate("/PageAdmin")
    }
    const logout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
        swal({
            title: "Are you sure?",
            text: "You Can Login Again For Finished Your Product and Toping!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your Account has been Logout!", {
                icon: "success",
              });
            } else {
              swal("Your Account is safe!");
            }
          });
      };
    
    const add = () =>{
        navigate("/addProduct")
    }

    const toping = () => {
        navigate("/AddToping")
    }

    return (
        <div>
            <nav className={styleModuleLogin.container}>
                <div className={styleModuleLogin.left}>
                    <img src={Header} style={{width: "100px", height: "100px"}} alt="" onClick={Home}/>
                </div>
                <div className={styleModuleLogin.right}>
                    <img src={Profile} className={styleModuleLogin.imgRegister} alt=""/> 
                    <NavDropdown style={{marginTop: "30px"}}>
                        <NavDropdown.Item>
                            <div style={{display: "flex", alignItems: "center"}} onClick={Admin}>
                                <img src={admin} alt="" style={{height: "30px"}} />
                                <p style={{marginLeft: "5px"}}>Admin</p>
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={add}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <img src={add1} alt="" style={{height: "30px"}} />
                                <p style={{marginLeft: "5px"}}>Product</p>
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={toping}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <img src={add1} alt="" style={{height: "30px"}} />
                                <p style={{marginLeft: "5px"}}>Toping</p>
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <img src={iconLogout} alt="" style={{height: "30px"}} />
                                <p style={{marginLeft: "5px"}}>Logout</p>
                            </div>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </nav>
        </div>)
}

export default NavbarAdmin