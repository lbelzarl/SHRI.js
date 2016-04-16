$('.load-students').on('click', function() {
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






