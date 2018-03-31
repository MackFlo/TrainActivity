var config = {
    apiKey: "AIzaSyDc5CeM5xN0JfjxcSQ44XxgMEJzs8yvTww",
    authDomain: "train-a9168.firebaseapp.com",
    databaseURL: "https://train-a9168.firebaseio.com",
    projectId: "train-a9168",
    storageBucket: "train-a9168.appspot.com",
    messagingSenderId: "891558579298"
  };
  firebase.initializeApp(config);
var database = firebase.database();

$("#submit").on("click", function(event){
    event.preventDefault();
    var inputName = $("#train").val().trim();
    var inputDestination = $("#destination").val().trim();
    var inputFirstTrain = $("#first").val().trim();
    var inputFrequency = moment($("#frequency").val().trim(), "HH:mm").format ("X");

    var newTrain ={
        name: inputName,
        destination: inputDestination,
        first: inputFirstTrain,
        frequency: inputFrequency
    };
database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

$("#train").val("");
$("#destination").val("");
$("#first").val("");
$("#frequency").val("");

var tFrequency = inputFrequency;
var firstTime = moment(inputFirstTrain, "HH:mm");
console.log(firstTime);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTime), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);



$("#current-train > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
firstTrain + "</td><td>" + frequency + "</td>");
});
});