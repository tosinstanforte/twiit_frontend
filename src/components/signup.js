import '../App.css';
import React, {useState} from 'react';




function SignUp() {

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

        // Axios.post('https://twitt-db.herokuapp.com/api/register', {
        //     email: data.email,
        //     password: data.password
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        var apiUrl = "https://twitt-db.herokuapp.com/api/register";
      
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
           
        };

        var  Data ={
            email: data.email,
            password: data.password

        };

        fetch(apiUrl, {
            method:'POST',
            headers: headers,
            body:JSON.stringify(Data)
        }
        )
        .then((response) => response.json())
        .then((response)=> 
        {
            console.log(response);
            alert("you have successfully registered")
           
        }
        ).catch((error)=>{
            alert("Error"+error)
        })


    }
  return (
    <form onSubmit={(e) => submit(e)} >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input onChange={(e) => handle(e)} type="email" id="email" value={data.email} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => handle(e)} type="password" id="password" value={data.password} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
    </form>
  );
}

export default SignUp;
