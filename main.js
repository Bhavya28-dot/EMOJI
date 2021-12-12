 prediction_1 = " ";
 prediction_2 = " ";

 Webcam.set({
     width: 350,
     height: 300,
     image_format: 'png',
     png_quality: 90
 });
 camera = document.getElementById("camera");
 Webcam.attach("#camera");

 function take_snapshot() {
     Webcam.snap(function (data_uri) {
         document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

     });
 }

 console.log("ml 5 version", ml5.version);
 classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pa8V4oM62/model.json", modelLoaded);

 function modelLoaded() {
     console.log("Model Loaded!");
 }

 function speak() {
     var synth = window.speechSynthesis;
     speak_data_1 = "Your first peridiction is" + prediction_1;
     speak_data_2 = "Your second peridiction is" + prediction_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
     synth.speak(utterThis);
 }

 function check() {
     img = document.getElementById("captured_image");
     classifier.classify(img, gotResult);
 }

 function gotResult(error, results) {
     if (error) {
         console.log(error);
     } else {
         console.log(results);
         document.getElementById("result_emotion_name").innerHTML = results[0].label;
         document.getElementById("result_emotion_name2").innerHTML = results[1].label;
         prediction_1 = results[0].label;
         prediction_2 = results[1].label;
         speak();
         if (results[0].label == "Happy") {
             document.getElementById("emoji_updated").innerHTML = "&#128522;";
         }
         if (results[0].label == "Sad") {
             document.getElementById("emoji_updated").innerHTML = "&#128532;";
         }
         if (results[0].label == "Angry") {
             document.getElementById("emoji_updated").innerHTML = "&#128548;";
         }


         if (results[1].label == "Happy") {
             document.getElementById("emoji_updated2").innerHTML = "&#128522;";
         }
         if (results[1].label == "Sad") {
             document.getElementById("emoji_updated2").innerHTML = "&#128532;";
         }
         if (results[1].label == "Angry") {
             document.getElementById("emoji_updated2").innerHTML = "&#128548;";
         }
     }

 }