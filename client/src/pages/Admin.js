import React from 'react'
import './admin.css'
import vector5 from "../assets/Vector5.png"
import vector4 from "../assets/Vector4.png"
import iconLogout from '../assets/iconLogout.png'
import Profile from '../assets//Rectangle 12.png'
import Header from '../assets/Header.png'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import NavbarAdmin from '../navbar/NavbarAdmin'

function Admin() {
    const [down, setDown] = useState()
    const navigate = useNavigate()

    const Logout = () => {
        navigate("/")
    }

    return (
        <div>
            <NavbarAdmin/>
            <div className="container-admin">
                <h2>income Transactions</h2>
                <div className="table-main">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Postcode</th>
                                <th>Income</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Sugeng No Pants</td>
                                <td>Cileungsi</td>
                                <td>16820</td>
                                <td>
                                    <p
                                        style={{
                                            textDecoration: "none"
                                        }}>69.000</p>
                                </td>
                                <td
                                    style={{
                                        color: "rgba(255, 153, 0, 1)"
                                    }}>Waiting Approve</td>
                                <td>
                                    <button
                                        style={{
                                            backgroundColor: "rgba(255, 7, 66, 1)",
                                            border: "none",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginRight: "10px"
                                        }}>Cancel</button>
                                    <button
                                        style={{
                                            backgroundColor: "rgba(10, 207, 131, 1)",
                                            border: "none",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginLeft: "10px"
                                        }}>Approve</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Hari Gams</td>
                                <td>Serang</td>
                                <td>42111</td>
                                <td>
                                    <p
                                        style={{
                                            textDecoration: "none"
                                        }}>30.000</p>
                                </td>
                                <td
                                    style={{
                                        color: "rgba(120, 168, 90, 1)"
                                    }}>Succes</td>
                                <td>
                                    <img
                                        src={vector5}
                                        style={{
                                            backgroundColor: "rgba(59, 181, 74, 1)",
                                            padding: "5px",
                                            borderRadius: "100%"
                                        }}/></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Aziz Union</td>
                                <td>Bekasi</td>
                                <td>13450</td>
                                <td>
                                    <p
                                        style={{
                                            textDecoration: "none"
                                        }}>28.000</p>
                                </td>
                                <td
                                    style={{
                                        color: "rgba(232, 57, 57, 1)"
                                    }}>Cancel</td>
                                <td>
                                    <img
                                        src={vector4}
                                        style={{
                                            backgroundColor: "rgba(226, 76, 75, 1)",
                                            padding: "5px",
                                            borderRadius: "100%"
                                        }}/></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Lae Tanjung Balai</td>
                                <td>Tanjung Balai</td>
                                <td>21331</td>
                                <td>
                                    <p
                                        style={{
                                            textDecoration: "none"
                                        }}>30.000</p>
                                </td>
                                <td
                                    style={{
                                        color: "rgba(0, 209, 255, 1)"
                                    }}>On The Way</td>
                                <td>
                                    <img
                                        src={vector5}
                                        style={{
                                            backgroundColor: "rgba(59, 181, 74, 1)",
                                            padding: "5px",
                                            borderRadius: "100%"
                                        }}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Admin