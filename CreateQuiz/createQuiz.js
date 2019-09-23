// This is specifically for createQuiz.html

// $("#exportQuestions").hide();

$(document).ready(function(){
    var quesNumber;
    $('#quesNum').keypress(function(e){ //disable user from entering 0
        if (this.value.length == 0 && e.which == 48 ){
           return false;
        }
     });

    $("#generate_template").click(function(){ //generate template based on the number of questions 
        quesNumber = $("#quesNum").val();//get the number in the input
        $("#content_hide1").hide();//hide this part of the form
        $("#questionlist").append("<h4>Question List</h4>");
        var i;//counter
        for (i = 1; i <= quesNumber; i++) {
            var content='<div class="container detailsgroup" id="Q'+i+'"> <label for="question1">Question '+i+ '</label> <textarea class="form-control" id="question'+i+'" rows="2" placeholder="Type question inside here"></textarea> <br> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="1" class="ans1"> </div> </div> <input type="text" class="form-control ans1"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="2" class="ans2"> </div> </div> <input type="text" class="form-control ans2"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="3" class="ans3"> </div> </div> <input type="text" class="form-control ans3"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="4" class="ans4"> </div> </div> <input type="text" class="form-control ans4"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <label class="input-group-text" for="inputGroupSelect'+i+'">Score</label> </div> <select class="custom-select" id="inputGroupSelect'+i+'"> <option selected>Choose...</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div></div><br>';
            $("#questionlist").append(content);
            var content ="";
        }
        //after populating the template, show the Export button        
        // $("#exportQuestions").show();
    });

    $("#exportQuestions").click(function(){        
        //First Details for sorting
        var quizTitle = $("#quizTitle").val(); console.log(quizTitle);
        var primary = $("#inlineFormCustomSelectPref option:selected").val(); console.log(primary);
        var subject = $("#inlineFormCustomSelectSubject option:selected").val(); console.log(subject);        
        //now the questions-looping through every question
        var i; //counter
        for (i=0; i<quesNumber; i++) {
            var row = "#Q"+(i+1)+"";
            var radioIn = "input[name='c"+(i+1)+"']:checked"
            var question = $(row).find("textarea").val(); console.log(question);
            var ans1 = $(row).find("input[type=text].ans1").val(); console.log(ans1);
            var ans2 = $(row).find("input[type=text].ans2").val(); console.log(ans2);
            var ans3= $(row).find("input[type=text].ans3").val(); console.log(ans3);;
            var ans4= $(row).find("input[type=text].ans4").val(); console.log(ans4);;
            var score = $(row).find("select option:selected").val();console.log(score);
            var rightans = $(radioIn).val();console.log(rightans);
        }

    });


})