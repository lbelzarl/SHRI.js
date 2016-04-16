$('.create-task').on('submit', function(event) {
    event.preventDefault();
    var taskName = $('.create-task__team-name').val();
    var description = $('.create-task__description').val();
    var id = SHRI.Tasks.create(taskName, description);
    $('<option value=' + id + '>' + taskName + '</option>')
        .appendTo('.assign-task__select');
});

$('.assign-task').on('submit', function(event) {
    event.preventDefault();
    var taskId = +$('.assign-task__select').val();
    var task = SHRI.Tasks.get(taskId);

    var teamId = [];
    $('.assign-task__content-teams input:checked').each(function(i, checked) {
        teamId.push(checked.value)});
    for (var i = 0; i < teamId.length; i++) {
        var team = SHRI.Teams.find(+teamId[i]);
        team.tasks.push({
            task: task,
            mark: null
        });

        $('<div class="task-container">' + 
                '<p data-task="' + taskId + '">' + task.taskName + '</p>' + 
                '<p data-team="' + +teamId[i] + '">' + team.teamName + '</p>' +
                '<div class="input-group">' +
                    '<input type="text" class="form-control mark-task__mark">' +
                    '<div class="input-group-btn">' +
                        '<button type="submit" class="btn mark-task__button-team">Оценить</button>' +
                    '</div>' +
                '</div>' +
          '</div>')
        .appendTo('.mark-task');
    }

    var studentId = [];
    $('.assign-task__content-students input:checked').each(function(i, checked) {
    studentId.push(checked.value)});
    for (var i = 0; i < studentId.length; i++) {
        var student = SHRI.Students.find(+studentId[i]);
        student.tasks.push({
            task: task,
            mark: null
        });

        $('<div class="task-container">' + 
            '<p data-task="' + taskId + '">' + task.taskName + '</p>' + 
            '<p data-team="' + +studentId[i] + '">' + student.fullName + '</p>' +
            '<div class="input-group">' +
                '<input type="text" class="form-control mark-task__mark">' +
                '<div class="input-group-btn">' +
                    '<button type="submit" class="btn mark-task__button-student">Оценить</button>' +
                '</div>' +
            '</div>' +
          '</div>')
        .appendTo('.mark-task');
    }

});

$(document.body).on('click', '.mark-task__button-team', function(e) {
    e.preventDefault();
    var button = $(this),
        mark = button.parent().prev(),
        teamId = button.parent().parent().prev(),
        taskId = teamId.prev(),
        team = SHRI.Teams.find(+teamId.attr('data-team')),
        task = SHRI.Tasks.get(+taskId.attr('data-task'));

    for (var i = 0; i < team.tasks.length; i++) {
        if (task.taskName == team.tasks[i].task.taskName) {
            team.tasks[i].mark = mark.val();
        }
    }
});

$(document.body).on('click', '.mark-task__button-student', function(e) {
    e.preventDefault();
    var button = $(this),
        mark = button.parent().prev(),
        studentId = button.parent().parent().prev(),
        taskId = studentId.prev(),
        student = SHRI.Students.find(+studentId.attr('data-team')),
        task = SHRI.Tasks.get(+taskId.attr('data-task'));

    for (var i = 0; i < student.tasks.length; i++) {
        if (task.taskName == student.tasks[i].task.taskName) {
            student.tasks[i].mark = mark.val();
        }
    }
});
