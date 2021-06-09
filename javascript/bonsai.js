var trees = trees || [];
var profile = profile || [];

(function () {
	// local state for functions
	var username;
	var password;
	$("#loginSection").hide();
	
	// if sessionStorage exists 
	if (window.sessionStorage) {
		// if sessionStorage doesn't have username
		if (sessionStorage.getItem("username") === null || sessionStorage.getItem("password") === null) {
			// show login section so they can login 
			$("#loginSection").show()
		}
		else { // if info is there
			// assign to local vars so we can use in later fxs
			username = sessionStorage["username"];
			password = sessionStorage["password"];

			// hide login section 
			$("#loginSection").hide();
			// get profile & start displaying content
			getProfile();
		}
	}
	else {
		alert("No Session Storage support!");
	}

	function getProfile () {
		try {
			var requestURL = 'data/profiles.json';
			var request = new XMLHttpRequest();
			request.open('GET', requestURL,true);
			request.responseType = 'json';
			request.send();
			
			request.onload = function (e) {
				if (request.readyState === 4) {
					var profileList = request.response;
					for (var i=0; i < profileList.length; i++) {
						if (profileList[i].username == username && profileList[i].password == password) {
							profile = profileList[i];
						}
					}
					if (profile.length === 0) {
						sessionStorage["username"] = null;
						sessionStorage["password"] = null;
						alert("Invalid username or password");
						$("#loginSection").show()
					}
					else {
						displayProfile();
						getTrees();
					}
				}
			}
		} catch (exception) {
			if (request.status != 200) {
				alert("error "+request.status+"-"+request.statusText);
			}
		}
	}
	
	function displayProfile () {
		var profileDiv = '<section>';
		profileDiv += (('<h2>Welcome '+profile.first_name+'!'+'</h2>') +
			'<button id="logoutBtn">Sign Out</button>' +
			'<button id="editProfileBtn">Edit Profile</button>' +		
			'<ul>' +
			('<li>First Name: '+profile.first_name+'</li>') +
			("<li>Last Name: "+profile.last_name+"</li>") +
			("<li>City: "+profile.city+"</li>") +
			'</ul></section>');

		$("footer").before(profileDiv);
		$("#logoutBtn").click(function (){
				sessionStorage.clear();
				location.reload();
			});
		$("#editProfileBtn").click(function (){
				// target collapsed box 
				window.location.href="#box";
				// fill in field values w/profile info 
				$("#editFirst").val(profile.first_name);
				$("#editLast").val(profile.last_name);
				$("#editCity").val(profile.city);
			});
	}
	
	function getTrees () {
		try {
			//console.log(profile.tree_list);
			var request2 = new XMLHttpRequest();
			request2.open('GET', profile.tree_list,true);
			request2.responseType = 'json';
			request2.send();
			
			request2.onload = function () {
				if (request2.readyState === 4) {
					trees = request2.response;
					displayTrees();
				}
			}
		} catch (exception) {
			if (request2.status != 200) {
				alert("error "+request2.status+"-"+request2.statusText);
			}
		}
	}
	
	function displayTrees () {
		for (var i = 0; i < trees.length; i++) {
			
			var treeDiv = '<article>';
			treeDiv += (('<h2>'+trees[i].Name+'</h2>') +
				'<ul>' +
				('<li>Species: '+trees[i].Species+'</li>') +
				("<li>Age: "+trees[i].Age+"</li>") +
				("<li>Years Owned: "+trees[i].Years_Owned+"</li>") +
				("<li>Form: "+trees[i].Form+"</li>") +
				'</ul>' +
				("<img src='"+trees[i].Picture+"'></img>") +
				'</article>');
				
			$("footer").before(treeDiv);
		}
	}
	
	/* ***** 
		event listeners
	***** */
	
	// add onclick event function to assign form info to sessionStorage
	// then reload to set page 
	$("#loginForm").submit(function (event) {
		event.preventDefault();
		username = $("#username").val();
		password = $("#password").val();				

		sessionStorage.setItem("username", username);
		sessionStorage.setItem("password", password);
		location.reload();
	});
	
	$("#updateProfileBtn").submit(function (event) {
		event.preventDefault();
		
		// check that if password has value, should match confirm 
		// update session storage for now, write to db later
		// using form field values when they click save button
		// save should return info to original page session storage 
		// save button & cancel button should also close window 
	});
	
})()