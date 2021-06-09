<?php

// https://www.w3schools.com/js/js_ajax_php.asp

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "scrambledfishdb";

$title = htmlspecialchars($_POST["title"]);
$date = $_POST["date"];
$content = htmlspecialchars($_POST["content"]);
$iconpic = $_POST["iconPic"];
$tags = htmlspecialchars($_POST["tags"]);

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO blogposts (Title, Date, Content, IconPic, Tags)
    VALUES ('$title', '$date', '$content', '$iconpic', '$tags')";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "<html><body><h2>New record created successfully</h2></body></html>";
    }
catch(PDOException $e)
    {
    echo $sql . "<html><body><br>" . $e->getMessage() . "</body></html>";
    }

$conn = null;
?>