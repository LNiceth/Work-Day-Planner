var planner = [];

//sets up planner with any tasks stored in local memory if there are any
function setUpPlanner() {
    planner = JSON.parse(localStorage.getItem("planner")) || [];
    for (let i = 0; i < planner.length; i++) {
        let hour = planner[i].hour;
        let task = planner[i].task;
        $(`#${hour}`).val(task);
    }
}

//Sets up time dependen elements. The current date is set up using moment.js
//Sets up the color coding of each text area according to the current time.
function setUpTimedElements() {
    updateDate();
    renderTextareaBackground();
}

// Gets each text area and using the curetn time determines its background color by updating it class list.
function renderTextareaBackground() {
    let currentHour = parseInt(moment().format("H"));
    $("textarea.form-control").each(function (i) {
        let id = parseInt($(this).attr("id"));
        if (id < currentHour) {
            $(this).css("background-color", "rgb(208, 208, 225)");
        } else if (id === currentHour) {
            $(this).css("background-color", "rgb(255, 204, 204)");
        } else {
            $(this).css("background-color", "rgb(204, 255, 204)");
        }
    });
}

// Updates date element with current time
function updateDate() {
    $("#date").text(moment().format("dddd, MMMM Do - h:mm:ss a"));
}

//Saves task upon clicking save button
$("button.btn").on("click", function () {
    //look for id/hour and input of element. 
    let id = parseInt($(this).data("hour"));
    let input = $(`#${id}`).val();

    // Assume task is new
    let newTask = true;
    for (var i = 0; i < planner.length; i++) {
        //if id is found in planner then is not a new task and we need to update task
        if (planner[i].hour === id) {
            newTask = false;
            planner[i].task = input;
        }
    }
    //if it is a new task update on planner
    if (newTask) {
        addTask(id, input);
    }
    //update planner item on local storage
    localStorage.setItem("planner", JSON.stringify(planner));
});

//Add a task consisting of an hour and an input
function addTask(hr, input) {
    let task = {
        hour: hr,
        task: input
    }
    planner.push(task);
}

//When document is ready, set up
$(document).ready(function () {
    setUpPlanner();
    setUpTimedElements();
    // Check time sensitive elemetns using intervals
    setInterval(updateDate, 1000);
    setInterval(renderTextareaBackground, 60 * 1000);
});