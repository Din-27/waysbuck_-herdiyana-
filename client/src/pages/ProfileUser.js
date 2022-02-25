import React, { useContext, useEffect } from 'react';
import styleProfile from './Profile.module.css'
import Logo from "../assets/WaysBucks 1.png"
import ImageQr from "../assets/Group 10.png"
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Transaction from './Transaction'
import { API } from '../config/api';
import Navbar from '../navbar/Navbar';
import { UserContext } from '../context/userContext';
import { Row, Col } from 'react-bootstrap'




function ProfileUser() {

    let {id} = useParams()
    const navigate = useNavigate()
    const [count, setCount] = useState(0);
    const [edit, setEdit] = useState(false)
    const [state, dispatch] = useContext(UserContext)
    const [isLogin, setIsLogin] = useState()
    const [transaction, setTransaction] = useState([])
    const [product, setProduct] = useState([])
    const [toping, setToping] = useState([])
    const path = 'http://localhost:5000/uploads/'
    const [preview, setPreview] = useState(null);
    const [userId, setUserId] = useState([])
    const [form, setForm] = useState({
      name: "",
      email: "",
      image: "",
    }); 


    const getMyTransaction = async () =>{
        try {
            const response = await API.get('/my-transactions')
            setTransaction(response.data.data)
            setToping(response.data.data[0].toping)
            // return console.log(response);
            setProduct(response.data.data[0].product)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyTransaction()
    }, [])

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
      
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
      
          const formData = new FormData();
          if (form.image) {
            formData.set("image", form?.image[0], form?.image[0]?.name);
          }
          formData.set("name", form.name);
          formData.set("email", form.email);
      
          const response = await API.patch(
            "/user/" + state.data.id,
            formData,
            config
          );
          console.log(response.data);
      
          setEdit(false);
        } catch (error) {
          console.log(error);
        }
      };

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      };

    

      
      const handleEdit = (id) => {
        setEdit(!edit)
        navigate("/profile/" + state.data.id);
    };

  


  return <div>
        <Navbar count={count} setCount={setCount}/>
    <div className={styleProfile.containerProfile}>
        <h2 className={styleProfile.leftTitle}>My profile</h2>
        <button onClick={handleEdit}>Edit</button>
        <div className={styleProfile.leftContent}>
            <img src={state.data.image} alt=""/>
            <div className={styleProfile.profilePeople}>
                <div className={styleProfile.up}>
                {edit ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input placeholder='Name' name='name' onChange={handleChange}/>
                        </div>
                        <div>
                            <input placeholder='Email' name='email' onChange={handleChange} />
                        </div>
                        <div>
                            <input type='file' name='image' onChange={handleChange} />
                        </div>
                        <div>
                            <button>submit edit</button>
                        </div>
                    </form>
                ) : (<div className={styleProfile.biodata}>
                  <img src={preview?(preview) : (path + state.data.image)} alt=""/>
                <div className={styleProfile.edit}>
                    <h3>Full Name</h3>
                    <p>{state.data.name}</p>
                </div>
                <div className={styleProfile.down}>
                    <h3>Email</h3>
                    <p>{state.data.email}</p>
                </div>
                </div>)}
                </div> 
            </div>
        </div>
        <h2 className={styleProfile.rightTitle}>My Transaction</h2>
        <div className={styleProfile.rightContent} itemType="button" onClick={()=>setIsLogin(true)}>
        <div className={styleProfile.descriptTransaction}>
            {transaction.map(transaction=>
                <div className={styleProfile.transactionOrder1}>
                <div className={styleProfile.order1}>
                <img src={path + product.image} alt=""/>
                    <div className={styleProfile.description1}>
                        <div className={styleProfile.titleDescript}>
                            <p>{product.name}</p>
                            <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                        </div>
                        <div className={styleProfile.topingOrder}>
                            <p style={{fontSize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                            <p style={{fontSize: "12px", color: "rgba(189, 7, 7, 1)"}}>{toping.name}</p>
                        </div>
                        <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "-20px"}}>Price : <span>{product.price + toping.price}</span></p>
                    </div>
                </div>
            </div>   )}   
        </div>
        <div className={styleProfile.imageQr}>
                <img className={styleProfile.logo} src={Logo} alt="" />
                <img src={ImageQr} alt="" />
                <p style={{fontSize: "12px", marginLeft: "53px", color: "rgba(0, 209, 255, 1)", backgroundColor: "rgba(0, 208, 255, 0.151)", textAlign: "center", marginRight: "30px", borderRadius: "3px"}}>On The Wayt</p>
                <p style={{fontSize: "14px", marginLeft: "28px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)"}}>Subtotal : 69.000</p>
            </div>
        </div>
    </div>
    <Transaction trigger={isLogin} setTrigger={setIsLogin}/>
</div>;
}

export default ProfileUser;


