;(function() {

$('.load-mentors').on('click', function() {
    // Создаём менторов
    SHRI.Mentors.delete();
    SHRI.Mentors.add('Николай', 'Николаев');
    SHRI.Mentors.add('Максим', 'Максимов');
    SHRI.Mentors.add('Константин', 'Константинов');
    SHRI.Mentors.add('Петр', 'Петров');

    var mentors = SHRI.Mentors.getAll(),
        students = SHRI.Students.getAll();

    // Случайно составляем списки студентов и менторов
    SHRI.Mentors.assignStudents(students);

    SHRI.Students.emptyAllMentors(mentors);
    SHRI.Students.assignMentors(mentors);

    renderLines(mentors, students);

    // Распределяем студентов по менторам
    var mentorProtege = SHRI.assign(mentors, students);

    renderProtege(mentorProtege);

    // Выводим менторов со списком приоритезированных студентов. 
    // Выводим студентов со списком приоритезированных менторов.

});

function renderLines(mentors, students) {
    $('.mentors-list__ul').empty();
    for (var i = 0; i < mentors.length; i++) {
        var item = $('<li class="mentors-list__item" data-id="' + i + '">' + mentors[i].fullName + '</li>');
        $('.mentors-list__ul').append(item);

        var mentorStudents = mentors[i].getStudents();
        for (var j = 0 ; j < mentorStudents.length; j++) {
            item.line(
                item.outerWidth(),
                item.outerHeight() / 2 - 5,
                600,
                SHRI.Students.getStudentId(mentorStudents[j]) * (32 + 50) + 16 - item.position().top,
                { color: '#42DB97', style: 'dashed', zindex: 1001, stroke: 3 }
            );
        }
    }

    $('.students-list__ul').empty();
    for (var i = 0; i < students.length; i++) {
        var item = $('<li class="students-list__item" data-id="' + i + '">' + students[i].fullName + '</li>');
        $('.students-list__ul').append(item);

        var studentMentors = students[i].getMentors();
        for (var j = 0 ; j < studentMentors.length; j++) {
            var mentorIndex = SHRI.Mentors.getId(studentMentors[j]),
                mentorBlock = $('.mentors-list__item[data-id="' + mentorIndex + '"]');

            item.line(
                0,
                item.outerHeight() / 2,
                -600 + mentorBlock.width() + 22,
                mentorIndex * (42 + 150) + 21 - item.position().top,
                { color: 'red', style: 'dashed' }
            );
        }
    }
}

function renderProtege(mentorProtege) {
    $('.mentor-student-assignment').empty();
    for (var i = 0; i < mentorProtege.length; i++) {
        if (mentorProtege[i].protege.length < 1) {
            continue;
        }

        var protegeList = $('<ul class="mentor-student__ul"></ul>');

        for (var j = 0; j < mentorProtege[i].protege.length; j++) {
            protegeList.append('<li>' + mentorProtege[i].protege[j].fullName + '</li>')
        }

        $('<div>' +
                '<p>' + mentorProtege[i].mentor.fullName + '</p>' +
            '</div>')
        .append(protegeList)
        .appendTo('.mentor-student-assignment');
    }
}

$('.form-mentor').on('submit', function(event) {
    var firstName = $('.form-mentor__firstName').val();
    var lastName = $('.form-mentor__lastName').val();
    var id = SHRI.Mentors.add(firstName, lastName);

    event.preventDefault();
});

}());
