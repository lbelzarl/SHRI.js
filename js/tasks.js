// Создает задачу через форму
$('.create-task').on('submit', function(event) {
    event.preventDefault();
    var taskName = $('.create-task__team-name').val();
    var description = $('.create-task__description').val();
    SHRI.Tasks.create(taskName, description);

    $(document.body).trigger('task:added');
});

$(document.body).on('task:added', function() {
    $('.assign-task__select').empty();
    $('.create-task__ul-task').empty();
    $('.create-task__div-task').show();
    var tasks = SHRI.Tasks.getAll();

    // Заполняем селект для для выбора задачи которую будем назначать.
    for (var i = 0; i < tasks.length; i++) {
        $('<option value="' + i + '">' + tasks[i].taskName + '</option>')
        .appendTo('.assign-task__select');

        $('<li>' + tasks[i].taskName + '</li>').appendTo('.create-task__ul-task');
    }
});

// Создает блок с наименованием задачи,
// указанием команды/студента и с возможностью выставления оценки
function blockAssignMark(taskId, taskName, type, assigneeId, assigneeName) {
    $('<div class="task-container">' +
            '<p class="task-container__task" data-task="' + +taskId + '">' + taskName + '</p>' +
            '<p class="task-container__assignee" data-' + type + '="' + +assigneeId + '">' + assigneeName + '</p>' +
            '<p class="task-container__mark">5</p>' +
            '<div class="input-group task-container__input-group">' +
                '<input type="text" class="form-control task-container__mark-input">' +
                '<div class="input-group-btn">' +
                    '<button type="submit" class="btn btn-primary task-container__button" data-type="' + type + '">Оценить</button>' +
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
            team = SHRI.Teams.getTeam(teamId);

        //Назначает задачу команде
        team.addTask(task);

        blockAssignMark(taskId, task.taskName, 'team', teamId, team.teamName);
    });

    $('.assign-task__content-students input:checked').each(function(i, input) {
        var studentId = +input.value,
            student = SHRI.Students.getStudent(studentId);

        //Назначает задачу студенту
        student.addTask(task);

        blockAssignMark(taskId, task.taskName, 'student', studentId, student.fullName);
    });
});

$('.mark-task').on('click', '.task-container__button', function(e) {
    var button = $(this),
        type = button.data('type'),
        container = button.parents('.task-container'),
        markInput = container.find('.task-container__mark-input'),
        markValue = +markInput.val(),
        assigneeBlock = container.find('.task-container__assignee'),
        assigneeId = +assigneeBlock.data(type),
        assignee,
        taskId = +container.find('.task-container__task').data('task'),
        task = SHRI.Tasks.get(taskId);

    if (markValue >= 1 && markValue <= 5) {
        if (type === 'team') {
            assignee = SHRI.Teams.getTeam(assigneeId);
        } else {
            assignee = SHRI.Students.getStudent(assigneeId);
        }

        for (var i = 0; i < assignee._tasks.length; i++) {
            if (task.taskName == assignee._tasks[i].task.taskName) {
                assignee._tasks[i].mark = markValue;
            }
        }

        container.find('.task-container__input-group').hide();

        container.find('.task-container__mark')
            .text('Оценка: ' + markValue)
            .fadeIn();
    } else {
        alert ('Выставьте оценку от 1 до 5');
    }

    e.preventDefault();
});

// Выставляет рандомную оценку первым 2 блокамы.
function estimate() {
    var randomIndex;
    for (var i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
        randomIndex = Math.floor(Math.random() * 4);
        $('.task-container__mark-input').eq(randomIndex).val(Math.floor(1 + Math.random() * 5));
        $('.task-container__button').eq(randomIndex).click();
    }
}
//
