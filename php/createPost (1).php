How to send Submissions to Your MySQL Database Using PHP

Last Update: March 18, 2016
First thing you'll need to learn is to know how to post submission data to your thank you page.  You can read and learn from the this guide:  

Assuming that you have set your form to post data to a custom URL page, you will have do some PHP/MySQL programming to do a form to MySQL.

The data being posted by JotForm is actually an array so to find out the array keys and values, you will have to try to insert this in your script:

   print_r( $_POST );   ?>

Next:  Do an actual submission to test your form and get the result.  Once you have submitted the form, it should be redirected to your custom thank-you URL that will receive the post data.  Here's an example of the data from a sample form:  http://www.jotform.com/form/11814245193  

Array
(
    [submission_id] => 186725738203177939
    [formID] => 11814245193
    [ip] => 203.177.93.98
    [name] => sample name test data
    [email] => email@gmail.com
    [phonenumber13] => Array
        (
            [0] => 3343
            [1] => 4234
        )

    [subject7] => Technical Support assistance
    [message6] => test
)

(Feel free to make a submission using this form to see the array result for yourself )

Now that we have the keys, we can now play around with these information, create your own fields on your database.  As for this example, this is what my fields look like:

Table structure

Creating your PHP script

Now that you have created your database, you can start creating your PHP script.

Step 1: To prevent possible SQL injection vulnerabilities to your database, we'll need to run PHP's addslash() function for every post variable.  And since the $_POST data is an array, let's make a function that will loop on every variable:


// This function will run within each post array including multi-dimensional arrays 
function ExtendedAddslash(&$params)
{ 
        foreach ($params as &$var) {
            // check if $var is an array. If yes, it will start another ExtendedAddslash() function to loop to each key inside.
            is_array($var) ? ExtendedAddslash($var) : $var=addslashes($var);
        }
}

     // Initialize ExtendedAddslash() function for every $_POST variable
    ExtendedAddslash($_POST);      

?>

Step 2:  I identified each POST data with a variable.  You will also notice that I merged the two phone number POST variables in to one (I just liked it that way :) ):

$submission_id = $_POST['submission_id']; 
$formID = $_POST['formID'];
$ip = $_POST['ip'];
$name = $_POST['name'];
$email = $_POST['email'];
$phonenumber = $_POST['phonenumber13'][0] ."-". $_POST['phonenumber13'][1];
$subject = $_POST['subject7'];
$message = $_POST['message6'];

?>

Step 3:  Now we initialize the database connectivity for the script to MySQL


$db_host = 'db hostname here';
$db_username = 'db username here';
$db_password = 'db password here';
$db_name = 'name of your database';
mysql_connect( $db_host, $db_username, $db_password) or die(mysql_error());
mysql_select_db($db_name); 
?>

Step 4: To check if an insert or an update should be done, a search should be initialized if the submission ID exists and then set a condition that if the submission ID exists, an update should be initialized using that submission ID.  And if there is no submission ID matching, then a new insert is going to be made:


// search submission ID

$query = "SELECT * FROM `table_name` WHERE `submission_id` = '$submission_id'";
$sqlsearch = mysql_query($query);
$resultcount = mysql_numrows($sqlsearch);

if ($resultcount > 0) {
 
    mysql_query("UPDATE `table_name` SET 
                                `name` = '$name',
                                `email` = '$email',
                                `phone` = '$phonenumber',
                                `subject` = '$subject',
                                `message` = '$message'        
                             WHERE `submission_id` = '$submission_id'") 
     or die(mysql_error());
    
} else {

    mysql_query("INSERT INTO `table_name` (submission_id, formID, IP, 
                                                                          name, email, phone, subject, message) 
                               VALUES ('$submission_id', '$formID', '$ip', 
                                                 '$name', '$email', '$phonenumber', '$subject', '$message') ") 
    or die(mysql_error());  

}
?>

You're done.  Name the script as your thank you php file and upload it to match the exact detail that you have set in your Custom Thank You URL

Here's the complete script:


// This function will run within each post array including multi-dimensional arrays 
function ExtendedAddslash(&$params)
{ 
        foreach ($params as &$var) {
            // check if $var is an array. If yes, it will start another ExtendedAddslash() function to loop to each key inside.
            is_array($var) ? ExtendedAddslash($var) : $var=addslashes($var);
            unset($var);
        }
} 

// Initialize ExtendedAddslash() function for every $_POST variable
ExtendedAddslash($_POST);      

$submission_id = $_POST['submission_id']; 
$formID = $_POST['formID'];
$ip = $_POST['ip'];
$name = $_POST['name'];
$email = $_POST['email'];
$phonenumber = $_POST['phonenumber13'][0] ."-". $_POST['phonenumber13'][1];
$subject = $_POST['subject7'];
$message = $_POST['message6'];

$db_host = 'db hostname here';
$db_username = 'db username here';
$db_password = 'db password here';
$db_name = 'name of your database';

mysql_connect( $db_host, $db_username, $db_password) or die(mysql_error());
mysql_select_db($db_name); 

// search submission ID

$query = "SELECT * FROM `table_name` WHERE `submission_id` = '$submission_id'";
$sqlsearch = mysql_query($query);
$resultcount = mysql_numrows($sqlsearch);

if ($resultcount > 0) {
 
    mysql_query("UPDATE `table_name` SET 
                                `name` = '$name',
                                `email` = '$email',
                                `phone` = '$phonenumber',
                                `subject` = '$subject',
                                `message` = '$message'        
                             WHERE `submission_id` = '$submission_id'") 
     or die(mysql_error());
    
} else {

    mysql_query("INSERT INTO `table_name` (submission_id, formID, IP, 
                                                                          name, email, phone, subject, message) 
                               VALUES ('$submission_id', '$formID', '$ip', 
                                                 '$name', '$email', '$phonenumber', '$subject', '$message') ") 
    or die(mysql_error());  

}
?>