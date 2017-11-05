var config = {
    apiKey: "AIzaSyByZ4L7979Gdsux0jo-tKD30PkyEwLXol8",
    authDomain: "train-schedule-a43d2.firebaseapp.com",
    databaseURL: "https://train-schedule-a43d2.firebaseio.com",
    projectId: "train-schedule-a43d2",
    storageBucket: "",
    messagingSenderId: "899681322225"
};
firebase.initializeApp(config);

function addTrain() {
    event.preventDefault();

    var train = $("#trainName").val().trim();
    var destination = $("#trainDest").val().trim();
    var first = $("#trainTime").val().trim();
    var freq = $("#trainFreq").val().trim();

    $("#trainName").val("");
    $("#trainDest").val("");
    $("#trainTime").val("");
    $("#trainFreq").val("");

    database.ref().push({
        train: train,
        destination: destination,
        first: moment(first).format("hh:mm:ss"),
        freq: moment(freq).format("hh:mm:ss"),
    });
}

database.ref().on("value", function(snapshot) {
    var data = snapshot.val();

    console.log(data);

$("#trainTableBody").empty();

for(var key in data) {
    
}
})