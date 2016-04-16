$('.create-task').on('submit', function(event) {
    event.preventDefault();
    var taskName = $('.create-task__team-name').val();
    var description = $('.create-task__description').val();
    var id = SHRI.Tasks.create(taskName, description);
    $('<option value=' + id + '>' + taskName + '</option>')
        .appendTo('.assign-task__select');
});

function addTask(taskId, taskName, type, assigneeId, assigneeName) {
    $('<div class="task-container">' +
            '<p data-task="' + +taskId + '">' + taskName + '</p>' +
            '<p data-' + type + '="' + +assigneeId + '">' + assigneeName + '</p>' +
            '<div class="input-group">' +
                '<input type="text" class="form-control mark-task__mark">' +
                '<div class="input-group-btn">' +
                    '<button type="submit" class="btn mark-task__button" data-type="' + type + '">Оценить</button>' +
                '</div>' +
            '</div>' +
      '</div>')
    .appendTo('.mark-task');
}

$('.assign-task').on('submit', function(event) {
    event.preventDefault();

    var taskId = +$('.assign-task__select').val();
    var task = SHRI.Tasks.get(taskId);

    $('.assign-task__content-teams input:checked').each(function(i, input) {
        var teamId = +input.value,
            team = SHRI.Teams.find(teamId);

        team.tasks.push({
            task: task,
            mark: null
        });

        addTask(taskId, task.taskName, 'team', teamId, team.teamName);
    });

    $('.assign-task__content-students input:checked').each(function(i, input) {
        var studentId = +input.value,
            student = SHRI.Students.find(studentId);

        student.tasks.push({
            task: task,
            mark: null
        });

        addTask(taskId, task.taskName, 'student', studentId, student.fullName);
    });
});

$('.mark-task').on('click', '.mark-task__button', function(e) {
    var button = $(this),
        type = button.data('type'),
        markInput = button.parent().prev(),
        assigneeBlock = markInput.parent().prev(),
        assigneeId = +assigneeBlock.data(type),
        assignee,
        taskId = +assigneeBlock.prev().data('task'),
        task = SHRI.Tasks.get(taskId);

    if (type === 'team') {
        assignee = SHRI.Teams.find(assigneeId);
    } else {
        assignee = SHRI.Students.find(assigneeId);
    }

    for (var i = 0; i < assignee.tasks.length; i++) {
        if (task.taskName == assignee.tasks[i].task.taskName) {
            assignee.tasks[i].mark = markInput.val();
        }
    }

    e.preventDefault();
});
