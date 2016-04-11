'use strict'


$('.form-student').on('submit', function(event) {
    var firstName = $('.form-student__firstName').val();
    var lastName = $('.form-student__lastName').val();
    var id = SHRI.Students.add(firstName, lastName);
    $('<option value=' + id + '>' + firstName + ' ' + lastName + '</option>')
        .appendTo('.create-teams__select');
    event.preventDefault();
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
        fieldset.appendChild(
            addCheckBox(SHRI.Teams._teams[SHRI.Teams._teams.length - 1].teamName, SHRI.Teams._teams.length - 1, 'legend')
        );

        Object.keys(studentsToAdd).forEach(function(studentId) {
            var student = SHRI.Students.find(+studentId);
            team.addMember(student);

            fieldset.appendChild(
                addCheckBox(student.fullName, studentId, 'label')
            );
        });
    } else {
        alert('Ошибка при создании команды, т.к.\n' + 'такая команда уже есть.');
    }
});



var form3 = document.querySelector('.create-tasks');
form3.addEventListener('submit', function(event) {

    // TODO: перевести на SHRI.*

    var select = document.getElementById('tasks');
    var tasksName = event.target.elements[0].value;
    Tasks.create(tasksName);
    var opt = document.createElement('option');
    opt.value = Tasks._tasks.length - 1;
    opt.innerHTML = Tasks._tasks[Tasks._tasks.length - 1];
    select.appendChild(opt);


    event.preventDefault();
});

var form4 = document.querySelector('.assign-task');
form4.addEventListener('submit', function(event) {

    var options = event.target.elements[0].options;

    _.find(options, function() {

    })


    for (let i = 0; i < event.target.elements[0].options.length; i++) {
        if (event.target.elements[0].options[i].selected)
            var task = (event.target.elements[0].options[i].value);
    };

    let checkboxes = form4.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            Students.find(checkboxes[i].value).tasks.push({
                task: task,
                mark: null
            });
        };
    };

    event.preventDefault();
});