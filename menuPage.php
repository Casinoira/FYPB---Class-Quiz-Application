<?php 
    $servername = "localhost";
    $username = "root";    
    
    // Create connection
    $conn = mysqli_connect($servername, $username,"");
    // Check connection
    if (!$conn) {
        echo 'Connection Error: '. mysqli_connect_error();
    } else {
        echo 'Success: connected to server. ';
    }

    // Create database
    $sql = "CREATE DATABASE IF NOT EXISTS quizapp;";
    if ($conn->query($sql) === TRUE) {        
        echo "Database created successfully. ";
    } else {
        echo "Error creating database: " . $conn->error;
    }

    mysqli_close($conn); //close and open again but connect to db this time
    $conn = mysqli_connect($servername, $username,"", "quizapp");
    $sql = "CREATE TABLE IF NOT EXISTS quiz(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50),
        primaryLevel INT NOT NULL,
        psubject VARCHAR(30),
        teacher VARCHAR(60),
        createDate DATE DEFAULT CURRENT_DATE() 
    );";

    if (mysqli_query($conn, $sql)) {
        echo "quiz . ";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    $sql = "CREATE TABLE IF NOT EXISTS question(
        id INT AUTO_INCREMENT PRIMARY KEY,
        txtQuestion VARCHAR(300),
        answer1 VARCHAR(100),
        answer2 VARCHAR(100),
        answer3 VARCHAR(100),
        answer4 VARCHAR(100),
        correctAns VARCHAR(100),
        scoreValue INT NOT NULL DEFAULT 1, /*2 OR 3*/
        quizID INT, /*FK*/
        CONSTRAINT fk_quiz FOREIGN KEY (quizID) REFERENCES quiz(id) ON DELETE CASCADE
    );";

    if (mysqli_query($conn, $sql)) {
        echo "question  ";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    $sql ="CREATE TABLE IF NOT EXISTS classroom(
        id INT AUTO_INCREMENT PRIMARY KEY,
        classCode VARCHAR(5) NOT NULL,
        classInDatYear INT /*each classroom may have a different year*/
    );";

    if(mysqli_query($conn, $sql)) {
        echo "classroom  ";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    $sql ="CREATE TABLE IF NOT EXISTS classgroup(
        id INT AUTO_INCREMENT PRIMARY KEY,
        cumulScore INT,    
        wins INT,
        classroomID INT, /*fk*/
        CONSTRAINT fk_classroom FOREIGN KEY (classroomID) REFERENCES classroom(id)
    );";
    
    if (mysqli_query($conn, $sql)) {
        echo "classgroup  ";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    $sql = "CREATE TABLE IF NOT EXISTS questionGroupScore(    
        groupAns INT NOT NULL,
        isCorrect TINYINT(5),
        scoreValue INT NOT NULL,
        quizID INT NOT NULL, 
        questionID INT NOT NULL,
        groupID INT NOT NULL,
        PRIMARY KEY (groupId, questionId),
        CONSTRAINT fk_quizForGroupScore FOREIGN KEY (quizID) REFERENCES quiz(id) ON DELETE CASCADE,
        CONSTRAINT fk_question FOREIGN KEY (questionID) REFERENCES question(id) ON DELETE CASCADE,
        CONSTRAINT fk_group FOREIGN KEY(groupID) REFERENCES classgroup(id) ON DELETE CASCADE
    );";

    if (mysqli_query($conn, $sql)) {
        echo "questionGroupScore";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    $sql = "CREATE TABLE IF NOT EXISTS classroomQuiz(
        maxScore INT,
        avgClassScore INT,
        classInDatYear INT,
        classroomID INT NOT NULL, /*FK*/
        quizID INT NOT NULL, /*FK*/
        CONSTRAINT fk_quizForRoomQuiz FOREIGN KEY (quizID) REFERENCES quiz(id) ON DELETE CASCADE,
        CONSTRAINT fk_classroomForRoomQuiz FOREIGN KEY (classroomID) REFERENCES classroom(id)
    );";

    if (mysqli_query($conn, $sql)) {
        echo "classroomQuiz  ";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    mysqli_close($conn);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>menuPage</title>
</head>
<body>
<br><br><br>
    <div class="container">
    	<h1>Real page</h1>
    	<form id="myform">
			<div class="input-group">
			  <div class="custom-file">
			    <input type="file" class="custom-file-input" id="upload">
			    <label class="custom-file-label" for="upload">Choose file</label>
			  </div>
			  <div class="input-group-append">
			    <button class="btn btn-outline-secondary" type="button" id="loadquiz">Load Quiz</button>
			  </div>
			</div>
			<textarea id="text" rows="20" cols="40"></textarea>
		</form>
        <button class="btn btn-outline-danger" id="getarray">Test Get array</button>
    </div>     
</body>
<script src="bootstrap/jQuery.js"></script>
<script src="bootstrap/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<script src="jquery.csv.min.js"></script>
<script src="csvProcess.js"></script>
<!-- <script src="papaparse.min.js"></script> -->
</html>