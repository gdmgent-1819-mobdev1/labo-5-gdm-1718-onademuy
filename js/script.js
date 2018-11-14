//initialize firebase
    let config = {
    apiKey: "AIzaSyDVHKphfECiuevSEqaLTWFdTIQxTG1HMYk",
    authDomain: "vast-block-201611.firebaseapp.com",
    databaseURL: "https://vast-block-201611.firebaseio.com",
    projectId: "vast-block-201611",
    storageBucket: "vast-block-201611.appspot.com",
    messagingSenderId: "889936716812"
  };
  firebase.initializeApp(config);

//register 
document.getElementById("register").addEventListener('click', function(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    localStorage.setItem("user", email);
    let password = document.getElementById("password").value;
    localStorage.setItem("passw", password);

    //connect with firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      localStorage.setItem("user", email);
      localStorage.setItem("passw", password);
    })
    .catch(function(error){
      document.getElementById("error").innerHTML = error.code;
      ;
    })
});

//sign in
document.getElementById("sign_in").addEventListener('click', function(e){
  e.preventDefault();
  let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
  
  //connect with firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    localStorage.setItem("user", email);
    localStorage.setItem("passw", password);
  })
  .catch(function(error){
    document.getElementById("error").innerHTML = error.code;
})


//sign out
document.getElementById("signout").addEventListener('click', function() {
  firebase.auth().signOut()
  .then(function(){
    localStorage.clear();
  })
  .catch(function(error){
    document.getElementById("error").innerHTML = "error";
  })
})

//get date, text and post to blog
document.getElementById('submitPost').addEventListener('click', function(e) {
  e.preventDefault();
  //date 
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth()+1;
  let year = today.getFullYear();
  let date = day + '/' + month + '/' + year;
  console.log(date);
  let author = currentUser;
  console.log(author);
	document.getElementById('blogValue').innerHTML += "<div class='post'><h1>" + document.getElementById('title').value + "</h1><p>" + document.getElementById("contentBlog").value; + "</p><p id='post_date'>posted at " + date + " by "  + currentUser + "</p></div>";	
});

//connect and show messages
firebase.auth().onAuthStateChanged(firebaseUser => {
		console.log(firebaseUser);
		document.getElementById("signout").classList.remove('a');
		document.getElementById ("loginn").classList.add('a');
		document.getElementById("ok").classList.remove('a');
		document.getElementById("ok").innerHTML =  firebaseUser.email;
		alert('Welcome ' + firebaseUser.email);
		document.getElementById("blogSection").classList.remove('a');
		localStorage.setItem('name', firebaseUser.email);
})
});