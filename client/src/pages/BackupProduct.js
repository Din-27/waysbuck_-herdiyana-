import React, { useState } from 'react';
import style from '../pages/DetailProduct.module.css'
import TopingCard from '../card/TopingCard';
import Navbar from '../navbar/Navbar';
import { useEffect } from 'react';
import { API } from '../config/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styleDetail2 from '../pages/DetailProduct.module.css'
import Choose from '../assets/Vector5.png'
import swal from '@sweetalert/with-react';











export default function DetailProduct2() {
  const [add, setAdd] = useState(false)
  let navigate = useNavigate()


    let { id } = useParams()
    const [count, setCount] = useState(0);
    const [product, setProduct] = useState({});
    const [topings, setTopings] = useState([]);
    const [toping, setToping] = useState([]);



    const getProduct = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct(response.data.data);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }


    const getTopings = async () => {
      try {
        const response = await API.get('/topings');
        setTopings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };


    const getToping = async () => {
      try {
        const response = await API.get(`/toping/${id}`);
        // setToping(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setAdd(true)
    };

    console.log(product);
    const handleBuy = async (e) => {
      e.preventDefault();

      const body = {
      idProduct: product.id,
      idToping: id,
      }
      console.log(body);
      const data = JSON.stringify(body);

      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        data,
      };
      await API.post("/transaction", body, config);
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      });
      setCount(count + 1)
  };

  useEffect(()=>{
    getProduct()
    getTopings()
  }, [])



  return (
      <div>
        <Navbar count={count} setCount={setCount}/>
          <div>
            <div className={style.Main}>
             <div className={style.Main}>
                <div className={style.LeftMain}>
                  <img src={product.image} alt={product.name}/>
                </div>
                <div className={style.RightMain}>
                <div className={style.descript}>
                  <p className={style.thisTitle}>{product.name}</p>
                  <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>{product.price}</p>
                  <p className={style.thisTitleToping}>Toping</p>
                </div>
              <div className={style.Toping}>
                {
                  topings?.map(topings=>
                    <Link to={`/product/` + topings.id} style={{ textDecoration: "none" }} key={topings.id}>
                  <div className={styleDetail2.TopingMAIN}>
                    <div className={styleDetail2.variant1}>
                      {add && (<img src={Choose} className={styleDetail2.choose}/>)}
                      <img className={styleDetail2.imgToping} src={topings.image} alt="" onClick={()=>getToping(toping.id)} />
                    </div>
                        <p style={{color: "rgb(236, 58, 58)", marginTop: "-35px", marginLeft: "10px"}}>{topings.price}</p>
                    <p style={{fontWeight: "bold", color : "rgb(236, 58, 58)", marginTop: "-20px", marginLeft: "5px"}}>{topings.name}</p>
                </div>
                </Link>)}
              </div>
              <div className={style.down}>
                <p className={style.thisTitleTotal}>Total</p>
                <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>0</p>
                <button className={style.btn} onClick={handleBuy}>Add Cart</button>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>)
}


