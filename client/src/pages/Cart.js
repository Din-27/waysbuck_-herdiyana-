import React, { useContext, useEffect, useState } from 'react';
import Vector4 from "../assets/Vector (4).png"
import Navbar from '../navbar/Navbar';
import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import styleCart from './Transaction.module.css'
import { API, setAuthToken } from '../config/api';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import iconDelete from '../assets/Vector (5).png'









function Cart() {

    const [transaction, setTransaction] = useState([])
    const [product, setProduct] = useState([])
    const [toping, setToping] = useState([])
    const navigate = useNavigate()
    const path = 'http://localhost:5000/uploads/'


    const [state, dispatch] = useContext(UserContext);
      useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }

        if (state.isLogin === false && !localStorage.token) {
          navigate("/");
        }
      }, [state]);
    
    const getMyTransaction = async () =>{
        try {
            const response = await API.get('/my-transactions')
            setTransaction(response.data.data)
            setToping(response.data.data[0].toping)
            setProduct(response.data.data[0].product)
            // console.log(response.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }


    let history = useNavigate()
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    address: "",
    image: "",
  }); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    //   e.preventDefault();

    //   const config = {
    //     headers: {
    //       "Content-type": "multipart/form-data",
    //     },
    //   };
    //   const formData = new FormData();
    //   formData.set("name", form.name);
    //   formData.set("email", form.email);
    //   formData.set("phone", form.phone);
    //   formData.set("postcode", form.postcode);
    //   formData.set("address", form.address);
    //   formData.set("image", form.image[0]);

    //   console.log(form);
      const response = await API.post("/cart");
      console.log(response);
      history("/PageAdmin");
    };

    const submit =()=>{
        swal("Good job!", "You clicked the button!", "success");
    }


    useEffect(()=>{
        getMyTransaction()
    }, [])


    const [idDelete, setIdDelete] = useState([])

    let handleDelete = async (id)=>{
      try {
        const res = await API.delete(`/order/${id}`)
        setIdDelete(res.data.data.id)
        // console.log(setIdDelete);
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    
  


  return (
    <div>
        <Navbar/>
         
            <Row className={styleCart.Cart}>
                    <p style={{fontSize: "35px", fontWeight: "bold", color: "rgba(189, 7, 7, 1)"}}>My Cart</p>
                    <p style={{marginBottom: "0"}}>Review Your Order</p>
                    <Col>
                    <hr style={{height: "5px", color: "red"}}/>
                        {transaction.map(transaction =>
                          <div className={styleCart.transactionOrder1}>
                          <div className={styleCart.cartorder1}>
                              <img src={path + product.image} alt=""/>
                              <div className={styleCart.description1}>
                                  <div className={styleCart.titleDescript}>
                                      <p>{product.name}</p>
                                      <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                                  </div>
                                  <div className={styleCart.topingOrder}>
                                      <p style={{fontWize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                                      <p style={{fontWize: "12px", color: "rgba(189, 7, 7, 1)"}}>{toping.name}</p>
                                  </div>
                              </div>
                          <Col>
                              <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "20px"}}>Rp.{product.price + toping.price}</p>
                              <img src={iconDelete} alt="" style={{width: "20px", height: "20px", marginLeft: "80px"}} onClick={()=>handleDelete(transaction.id)} />
                          </Col>
                          </div>
                      </div>)}
                    <hr style={{height: "5px", color: "red"}}/>
                    <Row className='container'>
                        <hr style={{height: "5px", color: "red"}}/>
                        <Col>
                            <p>SubTotal</p>
                            <p>Qty</p>
                            <p>Total : </p>
                        </Col>
                        <Col>
                            <p>Rp.{product.price + toping.price}</p>
                            <p>{transaction.length}</p>
                            <p style={{marginBottom: "-40px"}}>{product.price + toping.price * transaction.length}</p>
                        </Col>
                        <hr style={{height: "5px", color: "red"}}/>
                    </Row>
                    </Col>
                    <Col className='container' style={{marginTop: "40px", marginLeft: "20px" }}>
                    <form method="post" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <input placeholder="Name" className={styleCart.form}
                            name="name"
                            onChange={handleChange}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <input type="email" placeholder="Email" className={styleCart.form}
                            name="email"
                            onChange={handleChange}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPhone">
                            <input type="number" placeholder="Phone" className={styleCart.form}
                            name="phone"
                            onChange={handleChange}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPostCode">
                            <input type="number" placeholder="Post Code" className={styleCart.form}
                            name="postcode"
                            onChange={handleChange}
                             />
                        </Form.Group>
                        <FloatingLabel controlId="floatingTextarea2">
                        <textarea
                        className={styleCart.form}
                        placeholder="Address"
                        style={{ height: '100px', resize: "none" }}
                        name="address"
                        onChange={handleChange}
                        />
                        </FloatingLabel>
                        <Col>
                            <img src={Vector4} alt=""  className='ms-5' /> 
                        <input type="file" className={styleCart.customFileInput}
                        name="image"
                        onChange={handleChange}
                         />
                        <Button variant="danger" size='lg' className={styleCart.buttonPay} onClick={submit}>Pay</Button>
                        </Col>
                    </form>
                    </Col>
            </Row>
        
    </div>)
}

export default Cart;
