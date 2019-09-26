// This is specifically for createQuiz.html

$("#exportQuestions").hide();
$("#deleteprev").hide();

$(document).ready(function(){
    var quesNumber = 1; // to keep track of number of questions

    // $('#quesNum').keypress(function(e){ //disable user from entering 0
    //     if (this.value.length == 0 && e.which == 48 ){
    //        return false;
    //     }
    //  });

    $("#newquestion").click(function(){
        $("#deleteprev").show();
        quesNumber +=1; console.log(quesNumber);// increase counter
        var content='<div class="container detailsgroup" id="Q'+quesNumber+'"> <label for="question1">Question '+quesNumber+ '</label> <textarea class="form-control" id="question'+quesNumber+'" rows="2" placeholder="Type question inside here"></textarea> <br> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+quesNumber+'" value="1" class="ans1" checked> </div> </div> <input type="text" class="form-control ans1"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+quesNumber+'" value="2" class="ans2"> </div> </div> <input type="text" class="form-control ans2"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+quesNumber+'" value="3" class="ans3"> </div> </div> <input type="text" class="form-control ans3"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+quesNumber+'" value="4" class="ans4"> </div> </div> <input type="text" class="form-control ans4"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <label class="input-group-text" for="inputGroupSelect'+quesNumber+'">Score</label> </div> <select class="custom-select" id="inputGroupSelect'+quesNumber+'"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div></div> <br id="br'+quesNumber+'">';
        $("#questionlist").append(content);
        // quesNumber = $("#quesNum").val();//get the number in the input
        // $("#content_hide1").hide();//hide this part of the form
        // $("#questionlist").append("<h4>Question List</h4>");
        // var i;
        // for (i = 1; i <= quesNumber; i++) {
        //     var content='<div class="container detailsgroup" id="Q'+i+'"> <label for="question1">Question '+i+ '</label> <textarea class="form-control" id="question'+i+'" rows="2" placeholder="Type question inside here"></textarea> <br> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="1" class="ans1" checked> </div> </div> <input type="text" class="form-control ans1"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="2" class="ans2"> </div> </div> <input type="text" class="form-control ans2"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="3" class="ans3"> </div> </div> <input type="text" class="form-control ans3"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="c'+i+'" value="4" class="ans4"> </div> </div> <input type="text" class="form-control ans4"> </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <label class="input-group-text" for="inputGroupSelect'+i+'">Score</label> </div> <select class="custom-select" id="inputGroupSelect'+i+'"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div></div><br>';
        //     $("#questionlist").append(content);
        //     var content ="";
        // }
        //after populating the template, show the Export button        
        $("#exportQuestions").show();
    });

    $("#deleteprev").click(function(){
        $("#Q"+quesNumber+"").remove();
        $("#br"+quesNumber+"").remove();
        quesNumber -=1;
        if (quesNumber <=1 ) {
            $("#deleteprev").hide();
        }
    });

    $("#exportQuestions").click(function(){
        //First Details for sorting
        var quizTitle = $("#quizTitle").val(); //console.log(quizTitle);
        var primary = $("#inlineFormCustomSelectPref option:selected").val(); //console.log(primary);
        var subject = $("#inlineFormCustomSelectSubject option:selected").val(); //console.log(subject);        
        //now the questions-looping through every question
        var i; //counter
        for (i=0; i<quesNumber; i++) {
            var row = "#Q"+(i+1)+"";
            var radioIn = "input[name='c"+(i+1)+"']:checked"
            var question = $(row).find("textarea").val(); //console.log(question);
            var ans1 = $(row).find("input[type=text].ans1").val(); //console.log(ans1);
            var ans2 = $(row).find("input[type=text].ans2").val(); //console.log(ans2);
            var ans3= $(row).find("input[type=text].ans3").val(); //console.log(ans3);;
            var ans4= $(row).find("input[type=text].ans4").val(); //console.log(ans4);;
            var score = $(row).find("select option:selected").val();//console.log(score);
            var rightans = $(radioIn).val();//console.log(rightans);
        }

        var teststring = "hello \n world \n another,test,file \n another line"; console.log(teststring);

        var blob = new Blob([teststring], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "testfile1.csv");

    });


})