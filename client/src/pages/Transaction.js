import React, { useEffect, useState } from 'react';
import styleTrans from './Transaction.module.css'
import Rectangle4 from '../assets/Rectangle 4.jpg'
import Logo from "../assets/WaysBucks 1.png"
import ImageQr from "../assets/Group 10.png"
import { API } from '../config/api';





function Transaction(props) {

    const [transaction, setTransaction] = useState([])
    const [product, setProduct] = useState([])
    const [toping, setToping] = useState([])
    const path = 'http://localhost:5000/uploads/'


    console.log(transaction);
    const getMyTransaction = async () =>{
        try {
            const response = await API.get('/my-transactions')
            setTransaction(response.data.data)
            setToping(response.data.data[0].toping)
            // console.log(response.data.data[0].product);
            setProduct(response.data.data[0].product)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyTransaction()
    }, [])


  return (props.trigger) ? (<div>
        <div className={styleTrans.containerProfile}>
        <button className='Close' onClick={()=>props.setTrigger(false)} > X </button>{props.children}
        <div className={styleTrans.rightContent}>
        <div className={styleTrans.descriptTransaction}>
            {transaction.map(transaction=>
                <div className={styleTrans.transactionOrder1}>
                <div className={styleTrans.order1}>
                    <img src={path + product.image} alt=""/>
                    <div className={styleTrans.description1}>
                        <div className={styleTrans.titleDescript}>
                            <p>{product.name}</p>
                            <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                        </div>
                        <div className={styleTrans.topingOrder}>
                            <p style={{fontWize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                            <p style={{fontWize: "12px", color: "rgba(189, 7, 7, 1)"}}>{toping.name}</p>
                        </div>
                        <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "-20px"}}>Price : <span>{toping.price + product.price}</span></p>
                    </div>
                </div>
            </div>)}
        </div>
        <div className={styleTrans.imageQr}>
                <img className={styleTrans.logo} src={Logo} alt=""/>
                <img src={ImageQr} alt=""/>
                <p style={{fontSize: "12px", marginLeft: "53px", color: "rgba(0, 209, 255, 1)", backgroundColor: "rgba(0, 208, 255, 0.151)", textAlign: "center", marginRight: "30px", borderRadius: "3px"}}>On The Wayt</p>
                <p style={{fontSize: "14px", marginLeft: "28px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)"}}>Subtotal : 69.000</p>
            </div>
        </div>
    </div>
  </div>) : "";
}

export default Transaction;
