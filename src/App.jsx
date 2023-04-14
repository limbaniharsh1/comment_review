import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

function App() {
  let [data, setdata] = useState([]);
  let [ffname, setffname] = useState("");
  let [flname, setflname] = useState();
  let [femail, setfemail] = useState();
  let [fcom, setfcom] = useState();

  let fname = useRef();
  let lname = useRef();
  let email = useRef();
  let com = useRef();
  console.log(ffname.length)

  useEffect(() => {
    get();
  }, [ffname]);

  let get = async () => {
    let req = await fetch(`https://dummyjson.com/products?pages=1&limit=16`);
    let res = await req.json();
    setdata(res.products);
  };

  function scroll() {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }
  
  let review = (e) => {
    e.preventDefault();
    setffname(fname.current.value);
    setflname(lname.current.value);
    setfemail(email.current.value);
    setfcom(com.current.value);
    alert('success')
  };

  console.log(data);
  return (
    <div className="App">
      <div className="div">
        {data.map((v, i) => {
          return (
            <div key={i} className="row main">
              <div className="w-40">
                <h1>{v.title}</h1>
                <img src={v.thumbnail} alt="img" />
                <div className="price-sec">
                  <h2>price : {v.price}$</h2>
                  <div className="price-btn">
                    <button>Available stock : {v.stock}</button>
                    <button>buy now</button>
                  </div>
                </div>
                <h3>rating : {v.rating}</h3>
              </div>
              <div className="box w-60">
                <p>{v.description}</p>
                <div className="review">
                  <h5>
                    <span>5⭐</span> perfact product !
                  </h5>
                  <p>best quality</p>
                  <h6>✅ certify buyer , 8 days ago</h6>
                </div>
                {ffname.length==0 ? '' : <div className="review">
                  <h3>Your Review</h3>
                  <h5>
                    <span>5⭐</span>name : {ffname} {flname}
                  </h5>
                  <p>{fcom}</p>
                  <h6>✅ certify buyer , {Date()}</h6>
                </div>}
              </div>
            </div>
          );
        })}
        <div className="comment-main">
          <h5>Add Your Comment/Review</h5>
          <form onSubmit={review}>
            <div className="inp-box">
              <input type="text" placeholder="First Name" ref={fname} />
              <input type="text" placeholder="Last Name" ref={lname} />
            </div>
            <div className="inp-box">
              <input type="email" placeholder="Email" ref={email} required/>
              <input type="text" placeholder="Phone (not compulsory) / password" />
            </div>
            <div className="inp-box-2">
              <input
                type="text"
                placeholder="Add Your Review Here : "
                ref={com}
              />
            </div>
            <input type="submit" value="submit" className="btn" />
          </form>
        </div>
        <button className="go" onClick={scroll}><a href="#">click</a></button>
      </div>
    </div>
  );
}

export default App;
