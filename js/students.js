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