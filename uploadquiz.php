<?php   

if(isset($_POST['datatopass'])) {
    $jsonSomething = $_POST['datatopass'];
    // returnSuccessData($jsonSomething);
    insertQuery($jsonSomething);
  } else {
    echo "something failed: please check code";
  }

function returnSuccessData($datatopass) {       #echos out the array back to client. and the client writes it to console
  for ($row = 0; $row < count($datatopass); $row++) {
    for ($col = 0; $col < count($datatopass[0]); $col++) {
      echo $datatopass[$row][$col] . "\r\n";    
    }   
  }
}

function insertQuery($datatopass) {
  $servername = "localhost";
  $username = "root";
  $password = "";
  $db = "QuizApp";
  
  // Create connection
  $conn = mysqli_connect($servername, $username,"",$db);
  // Check connection
  if (!$conn) {
      echo 'Connection Error: '. mysqli_connect_error();
  } else {
      echo 'Success: connected to server. ';
  }

  $last_id=0;
  $sql = "INSERT INTO quiz (title, primaryLevel, psubject) VALUES (?, ?, ?)";
  if($stmt = mysqli_prepare($conn, $sql)){
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "sis", $title, $primarylevel, $subject);
    
    $title=$datatopass[0][0];
    $primarylevel=$datatopass[1][0];
    $subject=$datatopass[2][0];
    mysqli_stmt_execute($stmt);
    
    echo $title . " quiz inserted successfully."."\n";
    global $last_id; //to make it accessible
    $last_id = mysqli_insert_id($conn);
    echo 'last Id is ' . $last_id;

  } else {
    echo "ERROR: Could not prepare query: $sql. " . mysqli_error($conn);
  }  
    // echo "\n".$quizid .",". $txtQuestion.",". $answer1.",". $answer2.",". $answer3.",". $answer4.",". $correctAns.",". $scoreValue . "\n";      
  $sql = "INSERT INTO question(txtQuestion, answer1, answer2, answer3, answer4,correctAns,scoreValue,quizID) VALUES (?,?,?,?,?,?,?,?)";
  for ($row = 3; $row < count($datatopass); $row++) {    
    if($stmt = mysqli_prepare($conn,$sql)){

      mysqli_stmt_bind_param($stmt,"sssssiii",$txtQuestion, $answer1, $answer2, $answer3, $answer4, $correctAns, $scoreValue, $quizid);

      $txtQuestion = $datatopass[$row][0];
      $answer1 = $datatopass[$row][1];
      $answer2 = $datatopass[$row][2];
      $answer3 = $datatopass[$row][3];
      $answer4 = $datatopass[$row][4];
      $correctAns = $datatopass[$row][5];
      $scoreValue = $datatopass[$row][6];
      $quizid = $last_id;

      mysqli_stmt_execute($stmt);
      echo 'Data Row ' . $row . ' inserted';
    } else {
      echo "ERROR: Could not prepare query: $sql. " . mysqli_error($conn);
      break;
    }
  }

}

//     /* Set the parameters values and execute
//     the statement again to insert another row */
//     $first_name = "Hermione";
//     $last_name = "Granger";
//     $email = "hermionegranger@mail.com";
//     mysqli_stmt_execute($stmt);
    
//     /* Set the parameters values and execute
//     the statement to insert a row */
//     $first_name = "Ron";
//     $last_name = "Weasley";
//     $email = "ronweasley@mail.com";
//     mysqli_stmt_execute($stmt);
    
//     echo "Records inserted successfully.";
// } else{
//     echo "ERROR: Could not prepare query: $sql. " . mysqli_error($link);
// }
 
// // Close statement
// mysqli_stmt_close($stmt);
 
// // Close connection
// mysqli_close($link);


// $id = 1;
// /* Bind our params */
// /* BK: variables must be bound in the same order as the params in your SQL.
//  * Some people prefer PDO because it supports named parameter. */
// $stmt->bind_param('si', $content, $id);

// /* Set our params */
// /* BK: No need to use escaping when using parameters, in fact, you must not, 
//  * because you'll get literal '\' characters in your content. */
// $content = $_POST['content'] ?: '';

// /* Execute the prepared Statement */
// $status = $stmt->execute();
// /* BK: always check whether the execute() succeeded */
// if ($status === false) {
//   trigger_error($stmt->error, E_USER_ERROR);
// }
// printf("%d Row inserted.\n", $stmt->affected_rows);
?>

