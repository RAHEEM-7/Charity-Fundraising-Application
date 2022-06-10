function signupValidate() {
    console.log("signupValidate");
    let pass = document.getElementById('password').value ;
    let conpass = document.getElementById('repeat-password').value ;
     if (pass == conpass) 
     {
        console.log("passwords match");
        let name = document.getElementById('name').value ;
        let email = document.getElementById('email').value ;
        let phone = document.getElementById('phone').value ;
        let username = document.getElementById('username').value ;
        let data = {name:name,email:email,phone:phone,password:pass,username:username}  
        console.log(data);
        signup(data);
        return true ;
     } 
     else 
     {
         document.getElementById('password').style.borderColor = "#C7001A" ;
         document.getElementById('repeat-password').style.borderColor = "#C7001A" ;
         return false ;
     }  
 }

 function sigup(data) {
    var url = "http://127.0.0.1:5000/signup";
  
    //const data = new URLSearchParams();
    //for (const pair of new FormData(document.getElementById("mymsg"))) {
    //data.append(pair[0], pair[1]);
    //console.log(pair)
    //}
    // let data = {MSG: text, index:idx, chances:chance,vis:vis,chatId:chatId,fails:fail} 
    console.log("abc", data);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("Error h:", error));
  }
  
  function removeFromView() {
    var element = document.getElementById("chat-box");
    element.classList.add("invisible");
  }