$('.load-students').on('click', function() {

    //Загружаем список студентов
    SHRI.Students.delete();
    SHRI.Students.add('Вася', 'Васечкин');
    SHRI.Students.add('Валя', 'Валечкин');
    SHRI.Students.add('Петя', 'Петячкин');
    SHRI.Students.add('Митя', 'Митечкин');
    SHRI.Students.add('Витя', 'Витечкин');
    SHRI.Students.add('Вика', 'Викечкина');
    SHRI.Students.add('Маша', 'Машечкина');
    SHRI.Students.add('Даша', 'Дашечкина');
    SHRI.Students.add('Юля', 'Юлечкина');
    SHRI.Students.add('Таня', 'Танечкина');
    SHRI.Students.shuffle();

    $(document.body).trigger('student:added');

    //Создаем команды и групперуем студентов по командам.
    SHRI.Teams.delete();
    SHRI.Teams.create('Орлы');
    SHRI.Teams.create('Соколы');
    SHRI.Teams.create('Голуби');
    SHRI.Teams.create('Личинки');
    SHRI.Teams.shuffle();

    var students = SHRI.Students.getAll(),
        teams = SHRI.Teams.getAll();

    teams[0].addMember(students[0]);
    teams[0].addMember(students[1]);
    teams[0].addMember(students[2]);
    teams[1].addMember(students[3]);
    teams[1].addMember(students[4]);
    teams[1].addMember(students[5]);
    teams[2].addMember(students[6]);
    teams[2].addMember(students[7]);
    teams[3].addMember(students[8]);
    teams[3].addMember(students[9]);

    $(document.body).trigger('team:added');

    // Загружаем список задач.
    SHRI.Tasks.delete();
    SHRI.Tasks.create('Задача1', 'Подпрыгнуть 10 раз');
    SHRI.Tasks.create('Задача2', 'Подпрыгнуть 20 раз');
    SHRI.Tasks.create('Задача3', 'Подпрыгнуть 30 раз');
    SHRI.Tasks.create('Задача4', 'Подпрыгнуть 40 раз');

    $('.mark-task').empty();
    for (var i = 0; i < 2; i++) {
        var tasks = SHRI.Tasks.getAll(),
            randomTeamId = Math.floor(Math.random() * teams.length),
            randomStudentId = Math.floor(Math.random() * students.length),
            randomTaskId = Math.floor(Math.random() * tasks.length),
            task = SHRI.Tasks.get(randomTaskId),
            student = SHRI.Students.find(randomStudentId),
            team = SHRI.Teams.find(randomTeamId);

        blockAssignMark(randomTaskId, task.taskName, 'student', randomStudentId, student.fullName);

        randomTaskId = Math.floor(Math.random() * tasks.length);
        task = SHRI.Tasks.get(randomTaskId);
        blockAssignMark(randomTaskId, task.taskName, 'team', randomTeamId, team.teamName);

        if (i == 0) {
            assignMarkk();
        }
    }

    $(document.body).trigger('task:added');
//    $(document.body).trigger('assign:added');
});

$('.nav-tabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});
