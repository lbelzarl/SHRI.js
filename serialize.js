var SHRI = require('./SHRI.js');

// Создаём студентов
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

// Создаём команды
SHRI.Teams.create('Орлы');
SHRI.Teams.create('Соколы');
SHRI.Teams.create('Голуби');
SHRI.Teams.create('Личинки');
SHRI.Teams.shuffle();

var students = SHRI.Students.getAll(),
    teams = SHRI.Teams.getAll();

// Формируем команды
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

// Создаём задачи
SHRI.Tasks.create('Задача1', 'Подпрыгнуть 10 раз');
SHRI.Tasks.create('Задача2', 'Подпрыгнуть 20 раз');
SHRI.Tasks.create('Задача3', 'Подпрыгнуть 30 раз');
SHRI.Tasks.create('Задача4', 'Подпрыгнуть 40 раз');

var tasks = SHRI.Tasks.getAll();

// Распределяем задачи
students[0].addTask(tasks[0]);
students[2].addTask(tasks[1]);
teams[3].addTask(tasks[2]);

// Выставляем оценки за задачи
students[0].assignMark(tasks[0], 5);
students[2].assignMark(tasks[1], 4);
teams[3].assignMark(tasks[2], 1);

// Создаём менторов и приоретизованные списки
SHRI.Mentors.add('Николай', 'Николаев');
SHRI.Mentors.add('Максим', 'Максимов');
SHRI.Mentors.add('Константин', 'Константинов');
SHRI.Mentors.add('Петр', 'Петров');

var mentors = SHRI.Mentors.getAll();

// Случайно составляем списки студентов и менторов
SHRI.Mentors.assignStudents(students);
SHRI.Students.assignMentors(mentors);


console.log(JSON.stringify(SHRI.serialize(), null, 4));