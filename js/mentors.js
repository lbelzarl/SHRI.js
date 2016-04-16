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
        temp = 0;

    // Каждому ментору случайным образом назначаем двух студентов.
    for (var i = 0; i < mentors.length; i++) {
        var randomNumber = Math.floor(Math.random() * students.length);
        mentors[i]._students.push(students[randomNumber]);
        while (true) {
            var randomNumberNew = Math.floor(Math.random() * students.length);
            if (randomNumber !== randomNumberNew) {
                mentors[i]._students.push(students[randomNumberNew]);
                break;
            }
        }
    }
    
    // Каждому студенту случайным образом назначаем двух менторов.
    for (var i = 0; i < students.length; i++) {
        var randomNumber = Math.floor(Math.random() * mentors.length);
        students[i]._mentors.push(mentors[randomNumber]);
        while (true) {
            var randomNumberNew = Math.floor(Math.random() * mentors.length);
            if (randomNumber !== randomNumberNew) {
                students[i]._mentors.push(mentors[randomNumberNew]);
                break;
            }
        }
    }

    // Выводим менторов со списком приоритезированных студентов. 
    for (var i = 0; i < mentors.length; i++) {
        var mentor = mentors
    }

    // Выводим студентов со списком приоритезированных менторов.


    var mentorProtege = test();
});

function test() {

    var mentors = SHRI.Mentors.getAll(),
        students = SHRI.Students.getAll(),
        mentorProtege = [];

    for (var i = 0; i < mentors.length; i++) {
        var mentor = mentors[i],
            mentorStudents = mentor.getStudents(),
            protege = [],
            protegeList = $('<ul class="mentor-student__ul"></ul>');

        for (var j = 0; j < mentorStudents.length; j++) {
            var studentMentors = mentorStudents[j].getMentors();

            if (studentMentors.indexOf(mentor) >= 0) {
                protege.push(mentorStudents[j].fullName);
                protegeList.append('<li>' + mentorStudents[j].fullName + '</li>')
            }
        }

        if (protege.length) {
//            mentorProtege.push( {mentor: mentor.fullName, protege: protege} );
            $(`<div> 
                    <p>` + mentor.fullName + `</p>
                </div>`)
            .append(protegeList)
            .appendTo('.mentor-student')
        }
    }
//    return mentorProtege;
}

$('.form-mentor').on('submit', function(event) {
    var firstName = $('.form-mentor__firstName').val();
    var lastName = $('.form-mentor__lastName').val();
    var id = SHRI.Mentors.add(firstName, lastName);

    event.preventDefault();
});
