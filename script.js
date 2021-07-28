var update =0;
var displaydate = function() {
    var currentDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(currentDate);

   if (update != moment().format('HH')){
        past()
    }
};

var today = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
$('#currentDay').html(today);

var tasks = [];

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = [{
            time: "",
            task: ""
        }]
    } 
    
    // fills null array indices 
    for (var i = 0; i < tasks.length; i++) {
        if (!tasks[i]) {
            tasks[i] = {
                time: "",
                task: ""
            }
        }
    }
    
    tasks.forEach(function(task) {
        addTask(task.time, task.task);
    })
}

var now = moment();
// save button function
$(".time-slot").on("click", ".time-block", function() {
    console.log($(this))
    var text = $(this).text().trim();
    var textInput = $("<textarea>")
        .addClass("col-10 form-control")
        .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus")
});
$(".save-btn").on("click", function() {
    var textArea = $(this).closest(".time-slot").find(".form-control")
    
    // updates task text
    var text = textArea.val().trim();

    var taskP = $("<div>")
        .addClass("col-10 time-block")
        .html("<p class='m-2 task-item'>" + text + "</p>");

    textArea.replaceWith(taskP);

    // updates tasks array
    var index = $(this).closest(".time-slot").index();
    
    var taskTime = $(this)
        .closest(".time-slot")
        .attr("id")
        .replace("hr-", "");

    var taskObj = {
        time: taskTime,
        task: text
    }

    tasks[index] = taskObj;
    saveTasks();
    auditTime();
})
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// edit task item on click
$(".time-slot").on("click", ".time-block", function() {
    console.log($(this))
    var text = $(this).text().trim();
    var textInput = $("<textarea>")
        .addClass("col-10 form-control")
        .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus")
});

// save button function
$(".save-btn").on("click", function() {
    var textArea = $(this).closest(".time-slot").find(".form-control")
    
    // updates task text
    var text = textArea.val().trim();

    var taskP = $("<div>")
        .addClass("col-10 time-block")
        .html("<p class='m-2 task-item'>" + text + "</p>");

    textArea.replaceWith(taskP);

    // updates tasks array
    var index = $(this).closest(".time-slot").index();
    
    var taskTime = $(this)
        .closest(".time-slot")
        .attr("id")
        .replace("hr-", "");

    var taskObj = {
        time: taskTime,
        task: text
    }
    
    tasks[index] = taskObj;
    saveTasks();
    auditTime();
})


var past = function() {
    //string to integer
    var timehour = +now.format('HH');

    //timeframe 9 to 6
    for(let i = 9; i<18; i++){
        if(i == timehour){
            $('#'+timehour).find("textarea").addClass("present")
        }
        else if (i < timehour) {
            $("#" + i).find("textarea").addClass("past");
        }
        else {
            $("#" + i).find("textarea").addClass("future");}
    }
    update = timehour;
}

var loadEvent = function(){
    for(let i=0; i<localStorage.length; i++) {
        var localtime = locatStorage.key(i);
        var description = localStorage.getItem(localtime);
        var timeID = ('#'+localtime);
        $(timeID).find("textarea").val(description);
    }
}
//update time every seconds
setInterval(displaydate, 1000);
//update block
past();
loadEvent();
