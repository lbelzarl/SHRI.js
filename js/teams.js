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
        var student = SHRI.Students.getStudent(+studentId),
            studentTeam = SHRI.Teams.getMemberTeam(student);

        if (studentTeam !== null) {
            studentsInTeam.push('студент ' + student.fullName + ' находится в команде ' + studentTeam);
        }
    });

    if (studentsInTeam.length > 0) {
        alert('Ошибка при создании команды, т.к.\n ' + studentsInTeam.join('\n '));
        return;
    }

    //Пробует создать команду с введеным названием
    var teamName = $('.create-teams__name').val(),
        team = SHRI.Teams.create(teamName);

    // При успешной создании команды добавляет выбранных студентов в команду
    // иначе выдаст оповещание.
    if (team) {
        Object.keys(studentsToAdd).forEach(function(studentId) {
            var student = SHRI.Students.getStudent(+studentId);
            team.addMember(student);
        });
    } else {
        alert('Ошибка при создании команды, т.к.\n' + 'такая команда уже есть.');
        return;
    }

    $(document.body).trigger('team:added');
});

// Выводит список команд с его участниками.
$(document.body).on('team:added', function() {
    $('.assign-task__content-teams').empty();
    $('.create-teams__div-teams').empty();
    $('.create-teams__div-teams').show();
    var teams = SHRI.Teams.getAll();

    for (var i = 0; i < teams.length; i++) {
        $('<legend>' +
              '<label>' +
                '<input type="checkbox" value="' + i + '"/>' +
                 teams[i].teamName +
              '</label>' +
          '</legend>')
        .appendTo('.assign-task__content-teams');

        $('<label>' + teams[i].teamName + '</label>').appendTo('.create-teams__div-teams');

        var members = teams[i].getAllMembers(),
            membersList = $('<ul class="create-teams__ul"></ul>');

        for (var j = 0; j < members.length; j++) {
            membersList.append('<li>' + members[j].fullName + '</li>');
        }

        membersList.appendTo('.assign-task__content-teams');
        membersList.clone().appendTo('.create-teams__div-teams');
    }

});