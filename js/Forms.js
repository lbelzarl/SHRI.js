$('.download').on('click', function() {
    //Загружаем список студентов
    $('.form-student__firstName').val('Вася');
    $('.form-student__lastName').val('Васечкин');
    $('.form-student__button').click();

    $('.form-student__firstName').val('Петя');
    $('.form-student__lastName').val('Петячкин');
    $('.form-student__button').click();

    $('.form-student__firstName').val('Коля');
    $('.form-student__lastName').val('Колечкин');
    $('.form-student__button').click();

    $('.form-student__firstName').val('Юля');
    $('.form-student__lastName').val('Юличкина');
    $('.form-student__button').click();

    $('.form-student__firstName').val('Маша');
    $('.form-student__lastName').val('Машечкина');
    $('.form-student__button').click();

    $('.form-student__firstName').val('Валя');
    $('.form-student__lastName').val('Валечкина');
    $('.form-student__button').click();

    //Создаем команды и групперуем студентов по командам.
    $('.create-teams__name').val('Орлы');
    $('.create-teams__select [value="0"]').attr('selected', 'selected');
    $('.create-teams__select [value="1"]').attr('selected', 'selected');
    $('.create-teams__button').click();
    $('.create-teams__select [value="0"]').removeAttr('selected');
    $('.create-teams__select [value="1"]').removeAttr('selected');

    $('.create-teams__name').val('Соколы');
    $('.create-teams__select [value="2"]').attr('selected', 'selected');
    $('.create-teams__select [value="3"]').attr('selected', 'selected');
    $('.create-teams__button').click();
    $('.create-teams__select [value="2"]').removeAttr('selected');
    $('.create-teams__select [value="3"]').removeAttr('selected');

    $('.create-teams__name').val('Инвалиды');
    $('.create-teams__select [value="4"]').attr('selected', 'selected');
    $('.create-teams__select [value="5"]').attr('selected', 'selected');
    $('.create-teams__button').click();

    // Загружаем список задач.
    $('.create-task__team-name').val('Задача1');
    $('.create-task__description').val('Подпрыгнуть 10 раз');
    $('.create-task__button').click();

    $('.create-task__team-name').val('Задача2');
    $('.create-task__description').val('Подпрыгнуть 20 раз');
    $('.create-task__button').click();

    $('.create-task__team-name').val('Задача3');
    $('.create-task__description').val('Подпрыгнуть 30 раз');
    $('.create-task__button').click();

});


$('.form-student').on('submit', function(event) {
    var firstName = $('.form-student__firstName').val();
    var lastName = $('.form-student__lastName').val();
    var id = SHRI.Students.add(firstName, lastName);

    event.preventDefault();
    $(this).trigger('student:added', id);
});

$('.form-student').on('student:added', function(event, id) {
    var student = SHRI.Students.find(id);

    $('<option value="' + id + '">' + student.fullName + '</option>')
        .appendTo('.create-teams__select');

        $('<li type="none"><label><input type="checkbox" value="' + id + '"/>' + student.fullName + '</label></li>')
        .appendTo('.assign-task__ul-students');

});




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
              '<input type="checkbox" value="' + teamId + '"/>' +
               SHRI.Teams._teams[SHRI.Teams._teams.length - 1].teamName +
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



/*$('.assign-task').on('submit', function(event) {
    event.preventDefault();
    var task = $('.assign-task__select').val();
    vat teamId = 



})*/

