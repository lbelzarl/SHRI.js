
$('.form-student').on('submit', function(event) {
    var firstName = $('.form-student__firstName').val();
    var lastName = $('.form-student__lastName').val();
    var id = SHRI.Students.add(firstName, lastName);

    event.preventDefault();
    $(this).trigger('student:added', id);
});

$('.form-student').on('student:added', function(event, id) {
    var student = SHRI.Students.find(id);

    $('<option value=' + id + '>' + student.firstName + ' ' + student.lastName + '</option>')
        .appendTo('.create-teams__select');
});

SHRI.Students.add('Вася', 'Васечкин');
SHRI.Students.add('Петя', 'Петячкин');
SHRI.Students.add('Коля', 'Колечкин');
$('<option value="0">Вася Васечкин</option>').appendTo('.create-teams__select');
$('<option value="1">Петя Петячкин</option>').appendTo('.create-teams__select');
$('<option value="2">Коля Колечкин</option>').appendTo('.create-teams__select');


var fieldset = document.querySelector('fieldset');

function addCheckBox(text, value, type) {
    var inp = document.createElement('input');
    inp.type = "checkbox";
    inp.value = value;
    var leg = document.createElement(type);
    leg.innerHTML = text;
    leg.appendChild(inp);
    return leg;
}

$('.create-teams').on('submit', function(event) {
    event.preventDefault();

    // Формируем локальный объект со студентами
    var studentsToAdd = {};
    $('.create-teams__select option:selected').each(function(i, option) {
        studentsToAdd[+option.value] = option.text;
    });

    // Собираем массив студентов, кто уже в команде
    var studentsInTeam = [];
    Object.keys(studentsToAdd).forEach(function(studentId) {
        var student = SHRI.Students.find(+studentId),
            studentTeam = SHRI.Teams.getMemberTeam(student);

        if (studentTeam !== null) {
            studentsInTeam.push('студент ' + student.fullName + ' находится в команде ' + studentTeam);
        }
    });

    if (studentsInTeam.length > 0) {
        alert('Ошибка при создании команды, т.к.\n ' + studentsInTeam.join('\n '));
        return;
    }

    var teamName = $('.create-teams__name').val(),
        team = SHRI.Teams.create(teamName);

    if (team) {
        var teamId = SHRI.Teams.getTeamId(team);

        $('<legend>' +
              SHRI.Teams._teams[SHRI.Teams._teams.length - 1].teamName +
              '<input type="checkbox" value=' + teamId + '/>' +
          '</legend>')
        .appendTo('.assign-task__content');

        var membersList = $('<ul class="create-teams__ul"></ul>');

        Object.keys(studentsToAdd).forEach(function(studentId) {
            var student = SHRI.Students.find(+studentId);
            team.addMember(student);
            membersList.append('<li>' + student.fullName + '</li>') 
        });

        membersList.appendTo('.assign-task__content');
    } else {
        alert('Ошибка при создании команды, т.к.\n' + 'такая команда уже есть.');
    }
});

$('.create-task').on('submit', function(event) {
    event.preventDefault();
    var taskName = $('.create-task__team-name').val();
    var description = $('.create-task__description').val();
    var id = SHRI.Tasks.create(taskName, description);
    $('<option value=' + id + '>' + taskName + '</option>')
        .appendTo('.assign-task__select');


});



