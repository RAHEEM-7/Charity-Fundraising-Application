var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
let otp;
function signupValidate() {
    console.log("signupValidate");
    let pass = document.getElementById('password').value ;
    let conpass = document.getElementById('repeat-password').value;
    let otpuser=document.getElementById('otp').value;
     if (pass == conpass) 
     {
        document.getElementById('otp').style.borderColor = "green" ;
        document.getElementById('password').style.borderColor = "green" ;
        document.getElementById('repeat-password').style.borderColor = "green" ;
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
    //  else if (otp!=otpuser){
    //   document.getElementById('otp').style.borderColor = "#C7001A" ;
    //   return false;
    //  }
     else 
     {
         document.getElementById('password').style.borderColor = "#C7001A" ;
         document.getElementById('repeat-password').style.borderColor = "#C7001A" ;
         return false ;
     }  
 }
document.getElementById("sign").onsubmit = (e) => {
e.preventDefault();
console.log("test");
signupValidate();
$(".password").val(null);
};
document.getElementById("otpsend").onclick = (e) => {
  e.preventDefault();
  console.log("test1");
  sendEmail();
};
function sendEmail() {
  otp=Math.floor(Math.random()*100000);
  let name= document.getElementById('name').value;
  Email.send({
      Host: "smtp.elasticemail.com ",
      Username : "bankservices24.7@gmail.com",
      Password : "C72F68CD57ED1530E4773A91FD9A99354D3E",
      To : 'abdulraheem0859@gmail.com',
      From : "bankservices24.7@gmail.com",
      Subject : "Verification OTP",
      Body : "Hello "+name+"!Here is your OTP for creation of account in our Charity Life.\nOTP:"+otp,
  })
  .then((message) => {
      if (message=='OK'){
      alert("Otp is sent to the mail you entered")
      }
      else{
          alert("Please check your mail")
      }
  });

}

function signup(data) {
  var url = "http://127.0.0.1:5000/signup"; 
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
    if (parseInt(response.flag)==1){
      confirm("Signed up succesfully, you can login to your account");
      location.reload();
    }
    else {
      alert("Username already exists");
    }
  })
  .catch((error) => console.log("Error h:",error));
}
  
document.getElementById("login").onsubmit = (e) => {
  e.preventDefault();
  console.log("test2");
  var url = "http://127.0.0.1:5000/login";
  let username = document.getElementById('usrname').value ;
  let password = document.getElementById('pasword').value ;
  let data = {username:username,password:password}
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
    if (parseInt(response.flag)==1){
      location.replace('blog.html');
    }
    else {
      // location.reload();
    }
  })
  .catch((error) => console.log("Error h:", error));
}