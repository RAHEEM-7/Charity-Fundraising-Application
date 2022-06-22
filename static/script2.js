document.getElementById("edit").onsubmit = (e) => {
	e.preventDefault();
	let name = document.getElementById('edit-name').value ;
	let email = document.getElementById('edit-email').value ;
	let phone = document.getElementById('edit-phone').value ;
	let username = document.getElementById('edit-username').value ;
	let data = {name:name,email:email,phone:phone,username:username};
	let url = "http://127.0.0.1:5000/edited";
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
			alert("Changed Successfully");
			location.replace("http://127.0.0.1:5000/blogs");
		}
		else {
			alert("Wrong username");
			location.reload();
		}
	  })
	  .catch((error) => console.log("Error h:", error));
}

document.getElementById("startfundraiser").onsubmit = (e) => {
    e.preventDefault();
    console.log("testn");
    var url = "http://127.0.0.1:5000/createfundraiser";
    let fundraisename = document.getElementById('fundraise_name').value ;
    let fundraisedays= document.getElementById('fundraise_days').value ;
    let fundraiseamount= document.getElementById('fundraise_amount').value ;
    let fundraisedescription= document.getElementById('fundraise_description').value ;
    let fundraisephone= document.getElementById('fundraisePhone').value ;
    //let fundraiseimage= document.getElementById('fundraiseImage').value ;
    let fundraisetype= document.getElementById('fundraise_type').value ;
    
    let data = {type:fundraisetype,name:fundraisename,days:fundraisedays,amount:fundraiseamount,description:fundraisedescription,phone:fundraisephone}
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
        alert("Your fundraiser has been started,you can check in browse fundraisers page");
        location.reload();
      }
      else {
          alert("Some thing went wrong");
          location.reload();
      }
    })
    .catch((error) => console.log("Error h:", error));
  }