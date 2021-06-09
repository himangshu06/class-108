predtion_1 = "";
predtion_2 = '';


Webcam.set({

    width:350,
    height:300,
    image_format:"png",
    png_quality:90

});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="Smily" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/ZdhM4Xqxl/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded!");
}

function speak(){
     var synth = window.speechSynthesis;
     speak_data1 = "The first prediction is"+predtion_1;
     speak_data2 = "The second prediction is"+predtion_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
     synth.speak(utterThis);
}

function check(){
   img  = document.getElementById("Smily");
   classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
        predtion_1 = results[0].label;
        predtion_2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji_2").innerHTML="&#128512;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("update_emoji_2").innerHTML="&#128532;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("update_emoji_2").innerHTML="&#128548;";
        }
    }
}


