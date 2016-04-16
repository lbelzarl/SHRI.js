$('.load-mentors').on('click', function() {
    //Загружаем менторов
    $('.form-mentor__firstName').val('Николай');
    $('.form-mentor__lastName').val('Николаев');
    $('.form-mentor__button').click();

    $('.form-mentor__firstName').val('Максим');
    $('.form-mentor__lastName').val('Максимов');
    $('.form-mentor__button').click();

    $('.form-mentor__firstName').val('Константин');
    $('.form-mentor__lastName').val('Константинов');
    $('.form-mentor__button').click();


    var mentors = SHRI.Mentors.getAll(),
        students = SHRI.Students.getAll();

    // Случайно составляем списки студентов и менторов
    SHRI.Mentors.assignStudents(students);
    SHRI.Students.assignMentors(mentors);

    // Распределяем студентов по менторам
    var mentorProtege = SHRI.assign(mentors, students);

    renderProtege(mentorProtege);

    // Выводим менторов со списком приоритезированных студентов. 
    // Выводим студентов со списком приоритезированных менторов.

});

function renderProtege(mentorProtege) {

    for (var i = 0; i < mentorProtege.length; i++) {
        var protegeList = $('<ul class="mentor-student__ul"></ul>');

        for (var j = 0; j < mentorProtege[i].protege.length; j++) {
            protegeList.append('<li>' + mentorProtege[i].protege[j].fullName + '</li>')
        }

        $('<div>' +
                '<p>' + mentorProtege[i].mentor.fullName + '</p>' +
            '</div>')
        .append(protegeList)
        .appendTo('.mentor-student')
    }
}

$('.form-mentor').on('submit', function(event) {
    var firstName = $('.form-mentor__firstName').val();
    var lastName = $('.form-mentor__lastName').val();
    var id = SHRI.Mentors.add(firstName, lastName);

    event.preventDefault();
});
