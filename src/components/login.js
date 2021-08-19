import '../App.css';
import React, {useState} from 'react';
import { useHistory  } from "react-router-dom";
import Axios from 'axios';


function Login() {


    let history = useHistory();

    const [data, setData] = useState({
        email: "",
        password: ""

    })

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function submit(e){
        e.preventDefault()
      //  alert("yes");

        Axios.post('https://twitt-db.herokuapp.com/api/login', {
            email: data.email,
            password: data.password
          })
          .then(function (response) {
              if(response.statusText === "OK"){
                 
                  sessionStorage.setItem('token', response.data.result);
                console.log(response.data.result)
                  history.push("/post-in");
                  history.go(0)

              }
              else{
                console.log("failed")
              }
            // console.log(response);
            // 
          })
          .catch(function (error) {
            console.log(error);
            alert("check you login details")
          });


    }
  return (
    <form onSubmit={(e) => submit(e)} >
    <h3>Sign In</h3>

               <div className="form-group">
                    <label>Email address</label>
                    <input onChange={(e) => handle(e)} type="email" id="email" value={data.email} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => handle(e)} type="password" id="password" value={data.password} className="form-control" placeholder="Enter password" />
                </div>
   

    <button type="submit" className="btn btn-primary btn-block">Submit</button>
          
</form>
  );
}

export default Login;
