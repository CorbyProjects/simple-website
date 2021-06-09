var posts = posts || [];

(function () {
	
	function getBlogPosts () {

		$.ajax({
			url: '../php/getPost.php',
			type: 'GET',
			timeout: 12000,
			dataType: 'text',
		}).done(function (responseText){
			posts = JSON.parse(responseText);
			// populate post to page 
			displayLastPost();
			// populate other posts to links/list section 
			displayPostLists();
		}).fail(function () {
			alert("Error! Data not loaded.");
		});
	}
			
	function displayLastPost () {
		// get last (aka most recent) post
		var lastPost = {};
		var counter = 0;
		while (posts[counter] != undefined) {
			counter++;
		}
		lastPost = posts[counter-1];
		
		var postDiv = '<article id="lastPostArea">';
		postDiv += (('<img src="' + lastPost.iconPic + '">' +
			'<h2>'+lastPost.title+'</h2>') +
			'<time>' + lastPost.date + '</time>' +
			'<p>' + lastPost.content + '</p></article>');
		$("nav").after(postDiv);
		
	}
	
	function displayPostLists () {
		// for each post (maybe set a number of posts later?)
		for (var i in posts) {
			// make card to display icon, title, date?, and snippet of each post
			var postPreviewDiv = '<div id="'+i+'"><img class="thumb" src="'+posts[i].iconPic+'"><p>'+posts[i].title+'</p><time>'+posts[i].date+'</time><p class="snippetSized">'+posts[i].content+'</p></div>';
			
			// append into div w/class flexContainer
			var newDiv = $(".flexContainer").append(postPreviewDiv);
		}
		
		// attach event to each div that onclick  
		// #lastPostArea changes to show that entry
		for (var i in posts) {
			var newDiv = document.getElementById(i);
			newDiv.addEventListener("click", function (event) {
				// find the clicked div
				var newDivID = this.id;
				$("#lastPostArea>img").attr("src",posts[newDivID].iconPic);
				$("#lastPostArea>h2").html(posts[newDivID].title);
				$("#lastPostArea>time").html(posts[newDivID].date);
				$("#lastPostArea>p").html(posts[newDivID].content);
				location.hash = '#lastPostArea';
			});
		}
	}
	
	getBlogPosts();
})();