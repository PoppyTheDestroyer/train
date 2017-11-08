var config = {
    apiKey: "AIzaSyByZ4L7979Gdsux0jo-tKD30PkyEwLXol8",
    authDomain: "train-schedule-a43d2.firebaseapp.com",
    databaseURL: "https://train-schedule-a43d2.firebaseio.com",
    projectId: "train-schedule-a43d2",
    storageBucket: "",
    messagingSenderId: "899681322225"
};
firebase.initializeApp(config);

var database = firebase.database();

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

database.ref().on("value", function (snapshot) {
    var data = snapshot.val();

    console.log(data);

    $("#trainTableBody").empty();

    for (var key in data) {
        var train = data[key].name;
        var destination = data[key].destination;
        var first = parseInt(data[key].first);
        var freq = data[key].freq;

        //Function to find next train, will need first train, freq.
        var nextTrain = findNextTrain(first, freq);

        //Throw in new rows from user input
        var tRow = $("<tr>");

        var tD1 = $("<td>").text(train);
        var tD2 = $("<td>").text(destination);
        var tD3 = $("<td>").text(moment(first).format("hh:mm:ss"));
        var tD4 = $("<td>").text(moment(freq).format("hh:mm:ss"));
        var tD5 = $("<td>").text(nextTrain); 

        $(tRow).append(tD1, tD2, tD3, tD4, tD5)
        $("#trainTableBody").append(tRow);
    }
});

function findNextTrain(first, freq) {
    return first + freq;
};

$("#submit-train").click(function(event) {
    event.preventDefault();
    addTrain();
});