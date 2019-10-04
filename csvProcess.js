document.forms['myform'].elements['upload'].onchange = function(evt) {
    if(!window.FileReader) return; // Browser is not compatible

    var reader = new FileReader();
    var text;
    reader.onload = function(evt) {
        if(evt.target.readyState != 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        filecontent = evt.target.result;

        document.forms['myform'].elements['text'].value = evt.target.result;
    };

    reader.readAsText(evt.target.files[0]);
    console.log(reader);
};

$(document).ready(function(){

    $("#text").hide();
    var csvText;
    var protext;
    $("#loadquiz").click(function(){        
        csvText = $("#text").val();        

        protext = $.csv.toArrays(csvText);
        console.log(protext);


        $.ajax({
            url: "uploadquiz.php",
            type: 'POST',            
            data: {'datatopass': protext},
            success: function(response){
                console.log(response);
            }
        })

    })

    // $("#getarray").click(function(){     //for testing purpose
    //     console.log(protext[2][0]);
    // })


})


// document.getElementById("fileToLoad").addEventListener('change', function(){
//     var fr = new FileReader();
//     fr.onload = function(){
//         // document.getElementById("fileContents").textContent = this.result;
//         return this.result;        
//     }
//     var allText = fr.readAsText(this.files[0]);
//     console.log(allText);//see if assigned
//     //splitting process    
//     var allTextLines = allText.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];
//     for (var i=1; i<allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {
//             var tarr = [];
//             for (var j=0; j<headers.length; j++) {
//                 tarr.push(headers[j]+":"+data[j]);
//             }
//             lines.push(tarr);
//         }
//     }
// })
