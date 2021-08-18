import '../App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';



function Post() {
  const [data, setData] = useState({
    post: "",
})
const [postbyusers, Getpostbyusers ] = useState([])

useEffect(() => {
  
  Axios.get('https://twitt-db.herokuapp.com/api/getpost', {
  
  })
  .then(function (response) {
    // console.log(response.data.post);
   Getpostbyusers(response.data.post)
  })
  .catch(function (error) {
    console.log(error);
  });
}, [postbyusers])



useEffect(() => {
  //console.log(sessionStorage.getItem('token'));

  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),

    }
  }
  Axios.get('https://twitt-db.herokuapp.com/api/user', config)
  .then(function (response) {
    sessionStorage.setItem('name', response.data.user.name);
    sessionStorage.setItem('id', response.data.user.id);
     console.log(sessionStorage.getItem('name'));
   
  })
  .catch(function (error) {
    console.log(error);
  });
  
},[])




function handle(e){
  const newdata = {... data}
  newdata[e.target.id] = e.target.value
  setData(newdata)
  console.log(newdata)
}

function LikeThisPost(post_id){
  
  var mypost_id = post_id;

  Axios.post('https://twitt-db.herokuapp.com/api/like_post', {
    post_id: mypost_id,
   
   
  })
  .then(function (response) {
    console.log(response);
   
    Getpostbyusers()
  })
  .catch(function (error) {
    console.log(error);
  });

}


function submit(e){
    e.preventDefault()

    var user_id = sessionStorage.getItem('id')
    var user_name = sessionStorage.getItem('name')
    var apiUrl = "https://twitt-db.herokuapp.com/api/post";
      
    var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
       
    };

    var  Data ={
      post: data.post,
      user_id: user_id,
      user_name: user_name

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
       
    }
    ).catch((error)=>{
        alert("Error"+error)
    })
      
    //   var user_id = localStorage.getItem('id')
    //   var user_name = localStorage.getItem('name')

    // Axios.post('https://twitt-db.herokuapp.com/api/post', {
    //     post: data.post,
    //     user_id: user_id,
    //     user_name: user_name
       
    //   })
    //   .then(function (response) {
    //     console.log(response);
       
    //     Getpostbyusers()
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

}

  return (

     <div>
      <form onSubmit={(e) => submit(e)} >
            <div className="form-group">
                <textarea id="post" onChange={(e) => handle(e)} value={data.post} className="form-control">hello</textarea>
            
            </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
       </form>

     

       <ul>
           
       {postbyusers && postbyusers.map(posts => (
        <li key={posts.id}>
          <p>
            <b> {posts.name} </b>
            {posts.created_at}
          </p>
          
          {posts.post}

          <p onClick={() => LikeThisPost(posts.id)} >
            {posts.like_post} 
            Likes
          
          </p>
          <hr/>
        </li>
      ))}   
         
            
       </ul>
</div>

    

    
                

  );
}

export default Post;
