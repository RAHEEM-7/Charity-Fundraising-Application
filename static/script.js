// var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
// let otp;
// function signupValidate() {
//     console.log("signupValidate");
//     let pass = document.getElementById('password').value ;
//     let conpass = document.getElementById('repeat-password').value;
//     let otpuser=document.getElementById('otp').value;
//      if (pass == conpass) 
//      {
//         document.getElementById('otp').style.borderColor = "green" ;
//         document.getElementById('password').style.borderColor = "green" ;
//         document.getElementById('repeat-password').style.borderColor = "green" ;
//         console.log("passwords match");
//         let name = document.getElementById('name').value ;
//         let email = document.getElementById('email').value ;
//         let phone = document.getElementById('phone').value ;
//         let username = document.getElementById('username').value ;
//         let data = {name:name,email:email,phone:phone,password:pass,username:username}  
//         console.log(data);
//         signup(data);
//         return true ;
//      } 
//     //  else if (otp!=otpuser){
//     //   document.getElementById('otp').style.borderColor = "#C7001A" ;
//     //   return false;
//     //  }
//      else 
//      {
//          document.getElementById('password').style.borderColor = "#C7001A" ;
//          document.getElementById('repeat-password').style.borderColor = "#C7001A" ;
//          return false ;
//      }  
//  }
// document.getElementById("sign").onsubmit = (e) => {
// e.preventDefault();
// console.log("test");
// signupValidate();
// $(".password").val(null);
// };
// document.getElementById("otpsend").onclick = (e) => {
//   e.preventDefault();
//   console.log("test1");
//   sendEmail();
// };
// function sendEmail() {
//   otp=Math.floor(Math.random()*100000);
//   let name= document.getElementById('name').value;
//   Email.send({
//       Host: "smtp.elasticemail.com ",
//       Username : "bankservices24.7@gmail.com",
//       Password : "C72F68CD57ED1530E4773A91FD9A99354D3E",
//       To : 'abdulraheem0859@gmail.com',
//       From : "bankservices24.7@gmail.com",
//       Subject : "Verification OTP",
//       Body : "Hello "+name+"!Here is your OTP for creation of account in our Charity Life.\nOTP:"+otp,
//   })
//   .then((message) => {
//       if (message=='OK'){
//       alert("Otp is sent to the mail you entered")
//       }
//       else{
//           alert("Please check your mail")
//       }
//   });

// }

// function signup(data) {
//   var url = "http://127.0.0.1:5000/signup"; 
//   console.log("abc", data);
//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(data),
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then((res) => res.json())
//   .then((response) => {
//     console.log(response);
//     if (parseInt(response.flag)==1){
//       confirm("Signed up succesfully, you can login to your account");
//       location.reload();
//     }
//     else {
//       alert("Username already exists");
//     }
//   })
//   .catch((error) => console.log("Error h:",error));
// }
  
// document.getElementById("login").onsubmit = (e) => {
//   e.preventDefault();
//   console.log("test2");
//   var url = "http://127.0.0.1:5000/login";
//   let username = document.getElementById('usrname').value ;
//   let password = document.getElementById('pasword').value ;
//   let data = {username:username,password:password}
//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(data),
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }) 
//   .then((res) => res.json())
//   .then((response) => {
//     console.log(response);
//     if (parseInt(response.flag)==1){
//       location.replace('blog.html');
//     }
//     else {
//       // location.reload();
//     }
//   })
//   .catch((error) => console.log("Error h:", error));
// }

jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav');

	//open modal
	$main_nav.on('click', function(event){

		if( $(event.target).is($main_nav) ) {
			// on mobile open the submenu
			$(this).children('ul').toggleClass('is-visible');
		} else {
			// on mobile close submenu
			$main_nav.children('ul').removeClass('is-visible');
			//show modal layer
			$form_modal.addClass('is-visible');	
			//show the selected form
			( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
		}

	});

	//close modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//switch from a tab to another
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(){
		var $this= $(this),
			$password_field = $this.prev('input');
		
		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
		//focus and move cursor to the end of input field
		$password_field.putCursorAtEnd();
	});

	//show forgot-password form 
	$forgot_password_link.on('click', function(event){
		event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	$back_to_login_link.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}

	//REMOVE THIS - it's just to show error messages 
	$form_login.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
	$form_signup.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});


	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};

// (function () {
// 	'use strict';
// 	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
// 	  var msViewportStyle = document.createElement('style')
// 	  msViewportStyle.appendChild(
// 		document.createTextNode(
// 		  '@-ms-viewport{width:auto!important}'
// 		)
// 	  )
// 	  document.querySelector('head').appendChild(msViewportStyle)
// 	}
//   })();
  
  
//   (function () {
// 		'use strict';
// 		function emulatedIEMajorVersion() {
// 		  var groups = /MSIE ([0-9.]+)/.exec(window.navigator.userAgent)
// 		  if (groups === null) {
// 			return null
// 		  }
// 		  var ieVersionNum = parseInt(groups[1], 10)
// 		  var ieMajorVersion = Math.floor(ieVersionNum)
// 		  return ieMajorVersion
// 		}
  
// 		function actualNonEmulatedIEMajorVersion() {
// 		  // Detects the actual version of IE in use, even if it's in an older-IE emulation mode.
// 		  // IE JavaScript conditional compilation docs: http://msdn.microsoft.com/en-us/library/ie/121hztk3(v=vs.94).aspx
// 		  // @cc_on docs: http://msdn.microsoft.com/en-us/library/ie/8ka90k2e(v=vs.94).aspx
// 		  var jscriptVersion = new Function('/*@cc_on return @_jscript_version; @*/')() // jshint ignore:line
// 		  if (jscriptVersion === undefined) {
// 			return 11 // IE11+ not in emulation mode
// 		  }
// 		  if (jscriptVersion < 9) {
// 			return 8 // IE8 (or lower; haven't tested on IE<8)
// 		  }
// 		  return jscriptVersion // IE9 or IE10 in any mode, or IE11 in non-IE11 mode
// 		}
  
// 		var ua = window.navigator.userAgent
// 		if (ua.indexOf('Opera') > -1 || ua.indexOf('Presto') > -1) {
// 		  return // Opera, which might pretend to be IE
// 		}
// 		var emulated = emulatedIEMajorVersion()
// 		if (emulated === null) {
// 		  return // Not IE
// 		}
// 		var nonEmulated = actualNonEmulatedIEMajorVersion()
  
// 		if (emulated !== nonEmulated) {
// 		  window.alert('WARNING: You appear to be using IE' + nonEmulated + ' in IE' + emulated + ' emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON\'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!')
// 		}
// 	})();