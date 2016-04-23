// добавляет стундета через форму
$('.form-student').on('submit', function(event) {
    var firstName = $('.form-student__firstName').val();
    var lastName = $('.form-student__lastName').val();
    SHRI.Students.add(firstName, lastName);

    event.preventDefault();
    $(document.body).trigger('student:added');
});

$(document.body).on('student:added', function() {
    $('.assign-task__ul-students').empty();
    $('.create-teams__select').empty();
    $('.form-student__ul-students').empty();
    $('.form-student__div-students').show();
    var students = SHRI.Students.getAll();

    for (var i = 0; i < students.length; i++) {
        //Выводим список студентов под формой добавления студента
        $('<li>' + students[i].fullName + '</li>')
        .appendTo('.form-student__ul-students');

        // Заполняем селект для для выбора состава команты.
        $('<option value="' + i + '">' + students[i].fullName + '</option>')
        .appendTo('.create-teams__select');

        // Выводим список студентов для назначения задач
        $('<li type="none">' +
               '<label><input type="checkbox" value="' + i + '"/>' + students[i].fullName + 
               '</label>' +
          '</li>')
        .appendTo('.assign-task__ul-students');
    }
});