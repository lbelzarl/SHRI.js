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
        .appendTo('.assign-task__content-teams');

        var membersList = $('<ul class="create-teams__ul"></ul>');

        Object.keys(studentsToAdd).forEach(function(studentId) {
            var student = SHRI.Students.find(+studentId);
            team.addMember(student);
            membersList.append('<li>' + student.fullName + '</li>') 
        });

        membersList.appendTo('.assign-task__content-teams');
    } else {
        alert('Ошибка при создании команды, т.к.\n' + 'такая команда уже есть.');
    }
});
