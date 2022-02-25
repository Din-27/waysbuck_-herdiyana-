import React, { useContext, useEffect } from 'react'
import iconProfile from '../assets/iconProfile.png'
import iconLogout from '../assets/iconLogout.png'
import styleModuleLogin from '../pages/Page1.module.css'
import Header from '../assets/Header.png'
import Cart from '../assets/Vector.png'
import Profile from '../assets//Rectangle 12.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../context/userContext'
import swal from 'sweetalert'
import { API, setAuthToken } from '../config/api'
import { NavDropdown} from 'react-bootstrap'






function Navbar(props) {
    
    let {id} = useParams()
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState()
    const [state, dispatch] = useContext(UserContext);
    const path = 'http://localhost:5000/uploads/'

    const Home = ()=>{
        navigate("/PageLogin")
    }

    const CartPage = () => {
        navigate("/cart")
    }

    const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
    swal({
        title: "Are you sure?",
        text: "You Can Login Again For Finished Your Transaction!",
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


    console.log(transaction);
    useEffect(() => {
        if (localStorage.token) {
        setAuthToken(localStorage.token);
        }

        if (state.isLogin === false && !localStorage.token) {
        navigate("/");
        }
    }, [state]);

    const chekUser = async () => {
        try {
        const response = await API.get("/check-auth");

        if (response.status === 404) {
            return dispatch({
            type: "AUTH_ERROR",
            });
        }
        let payload = response.data.data.user;
        payload.token = localStorage.token;
        dispatch({
            type: "USER_SUCCESS",
            payload,
        });
        } catch (error) {
        console.log(error);
        }
    };

    const getMyTransaction = async () =>{
        try {
            const response = await API.get('/my-transactions')
            setTransaction(response.data.data.length)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyTransaction()
        chekUser();
    }, []);

    return (
        <div>
            <nav className={styleModuleLogin.container}>
                <div className={styleModuleLogin.left}>
                    <img src={Header} style={{width: "100px", height: "100px"}} alt="" onClick={Home} />
                </div>
                <div className={styleModuleLogin.right}>
                <p style={{backgroundColor: "red", color:"white", fontWeight: "bold", height: "25px", width: "25px", textAlign: "center", borderRadius: "100%"}}>{transaction}</p>
                    <img src={Cart} className={styleModuleLogin.imgCart} alt="" onClick={CartPage} />
                    <img src={path + state.data.image} className={styleModuleLogin.imgRegister} alt="" />   
                    <NavDropdown style={{marginTop: "30px"}}>
                        <NavDropdown.Item>
                            <Link to={`/profile/` + state.data.id} style={{textDecoration: "none", color: "black"}}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src={iconProfile} alt="" style={{height: "30px"}} />
                                    <p style={{marginLeft: "5px"}}>Profile</p>
                                </div>
                            </Link>
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

export default Navbar