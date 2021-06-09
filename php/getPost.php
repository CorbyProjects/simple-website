<?php

// https://www.w3schools.com/js/js_ajax_php.asp

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "scrambledfishdb";

// create connection 
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

// prep query 
$sql = "SELECT Title, Date, Content, IconPic, Tags  FROM blogposts";
$result = $conn->query($sql);

// prep results & send back data 
// push each row's results to array, echo array
$resultArray = array();

if ($result->num_rows > 0) {
// output data of each row
	while($row = $result->fetch_assoc()) {
		$rowArray = ['title' => $row["Title"],'date' => $row["Date"], 'content' => $row["Content"], 'iconPic' => $row["IconPic"], 'tags' => $row["Tags"]];
		
		array_push($resultArray, $rowArray);
	}
	echo json_encode($resultArray, JSON_FORCE_OBJECT);
} else {
	echo "{}";
}

// close connection 
$conn->close();
?>