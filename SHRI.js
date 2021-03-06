'use strict'

//---------------------Студенты-------------------------------------

;(function() {

    var Students = {

        /**
         * Внутренний массив для хранения студентов.
         * @type {Array}
         * @private
         */
        _students: [],

        /**
         * Добавляет студента
         * @param {String} firstName - имя студента.
         * @param {String} lastName - фамилия студента.
         * @return {Number} возвращает индекс в массиве студентов. 
         */
        add: function(firstName, lastName) {
            this._students.push(new Student(firstName, lastName));
            return this._students.length - 1;
        },

        /**
         * Находит студента в массиве _students по его положению в нем.
         * @param {Number} idStudent - номер студента в массиве _students. 
         * @return {Student} - Объект студент.
         */
        getStudent: function(idStudent) {
            return this._students[idStudent];
        },

        /**
         * Возвращает массив студентов
         * @return {Array}
         */
        getAll: function() {
            return this._students;
        },

        /**
         * Возвращает индекс студента в массиве _students.
         * @param {Student} student - Студент.
         * @return {Number|Null} - Возвращает индекс студента в массиве _students
         *                                                 а при его отсутствии - null.
         */
        getStudentId: function(student) {
            for (var i = 0; i < this._students.length; i++) {
                if (student === this._students[i]) {
                    return i;
                }
            }
            return null;
        },

        /**
         * При вызове без переметров удаляет всех студентов,
         * иначе удаляет указанного студента. 
         * @param {Number} [id] - номер студента в массиве _students.
         */
        delete: function(id) {
            if (id === undefined) {
                this._students = [];
            } else {
                this._students.splice(id, 1);
            }
        },

        /**
         * Каждому студенту случайным образом назначаем двух менторов.
         * TODO: назначать случайное или заданное количество студентов
         * @param {Array} [mentors] - массив менторов.
         */
        assignMentors: function(mentors) {
            var students = this._students;

            for (var i = 0; i < students.length; i++) {
                var randomMentorsIndex = Math.floor(Math.random() * mentors.length);
                students[i].addMentor(mentors[randomMentorsIndex]);

                while (true) {
                    var nextRandomMentorsIndex = Math.floor(Math.random() * mentors.length);
                    if (randomMentorsIndex !== nextRandomMentorsIndex) {
                        students[i].addMentor(mentors[nextRandomMentorsIndex]);
                        break;
                    }
                }
            }
        },

        /**
         * Очищает всех выбранных менторов у всех студентов
         */
        emptyAllMentors: function() {
            var students = this._students;

            for (var i = 0; i < students.length; i++) {
                students[i].deleteMentors();
            }
        },

        /**
         * Случайным образом перетасовывает массив _students
         */
        shuffle: function() {
            this._students.sort(function(a, b) {
                return (Math.round(Math.random()) - 0.5);
            });
        }
    };

    /**
     * @constructor
     * @param {String} firstName - Имя студента.
     * @param {String} lastName - Фамилия студента.
     */
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
        this._tasks = [];
        this._mentors = [];
    }

    /**
     * Сериализует студентов в массив
     * @return {Array}
     */
    Student.prototype.serialize = function() {
        return [
            this.firstName, 
            this.lastName, 
            this._tasks,
            this._mentors.map(function(mentor) {
                return Mentors.getId(mentor);
            })
        ];
    }

    /**
     * Добавляет ментора в массив менторов в которых заинтересован студент
     * @param {Mentor} mentor - ментор
     */
    Student.prototype.addMentor = function(mentor) {
        this._mentors.push(mentor);
    }

    /**
     * Добавляет назначеную задачу в массив задач( _tasks ) студента.
     * @param {Task} task Задача.
     */
    Student.prototype.addTask = function(task) {
        this._tasks.push({
            task: task,
            mark: null
        });
    }

    /**
     * Выставляет оценку за задачу.
     * @param  {Task} task - задача
     * @param  {Number} mark - оценка
     */
    Student.prototype.assignMark = function(task, mark) {
        for (var i = 0; i < this._tasks.length; i++) {
            if (task == this._tasks[i].task) {
                this._tasks[i].mark = mark;
            }
        }
    }

    /**
     * Возвращает массив менторов в которых заинтересован студент
     * @return {Array} - Массив менторов заинтересовавших студента.
     */
    Student.prototype.getMentors = function() {
        return this._mentors;
    }

    /**
     * При вызове без переметров удаляет всех студентов,
     * иначе удаляет указанного студента. 
     * @param {Number} [id] - номер студента в массиве _students.
     */
    Student.prototype.deleteMentors = function(id) {
        if (id === undefined) {
            this._mentors = [];
        } else {
            this._mentors.splice(id, 1);
        }
    }


    //------------------Команды----------------------------------------------

    var Teams = {

        /**
         * Внутренний массив для хранения команд.
         * @type {Array}
         * @private
         */
        _teams: [],

        /**
         * Ищет команду по ее названию.
         * @param {String} teamName - Название команды
         * @return {Team|null} При успешном поиске возвращает саму команду иначе null.
         */
        find: function(teamName) {
            for (var i = 0; i < this._teams.length; i++) {
                if (teamName === this._teams[i].teamName) {
                    return this._teams[i];
                }
            }

            return null;
        },

        /**
         * Возвращает команду по ее индексу.
         * @param {Number} idTeam - индекс команды в массиве
         * @return {Team} Возвращает команду 
         */
        getTeam: function(idTeam) {
            return this._teams[idTeam];
        },

        /**
         * Создаёт новую команду
         * @param {String} teamName - название команды
         * @return {Team|null} - новая команда или null, если команда с таким названием уже есть
         */
        create: function(teamName) {
            if (this.find(teamName) !== null) {
                return null;
            }

            var team = new Team(teamName);
            this._teams.push(team);
            return team;
        },

        /**
         * На вход принимает команду и возвращает ее индекс в массиве _teams
         * @param {Team} team - объект команды
         * @return {Number|Null} - Возвращает индекс команды в массиве _teams, а при его отсутствии - null.
         */
        getTeamId: function(team) {
            for (var i = 0; i < this._teams.length; i++) {
                if (team === this._teams[i]) {
                    return i;
                }
            }
            return null;
        },

        /**
         * Проверяет находится ли студент уже в какой-нибудь команде.
         * @param {Student} student - Студент.
         * @return {String|null} Если не в команде возвращает null, иначе название команды.
         */
        getMemberTeam: function(student) {
            for (var i = 0; i < this._teams.length; i++) {
                if (this._teams[i].hasMember(student)) {
                    return this._teams[i].teamName;
                }
            };
            return null;
        },

        /**
         * Удаляет все команды, либо удаляет указанную
         * @param {Number} idTeam - Индекс команды в массиве команд
         */
        delete: function(idTeam) {
            if (idTeam === undefined) {
                this._teams = [];
                return;
            }

            this._teams.splice(idTeam, 1);
        },

        /**
         * Возвращает массив команд
         * @return {Array}
         */
        getAll: function() {
            return this._teams;
        },

        /**
         * Случайным образом перемешивает массив _teams
         */
        shuffle: function() {
            this._teams.sort(function(a, b) {
                return (Math.round(Math.random()) - 0.5);
            });
        }
    };

    /**
     * Класс команда
     * @constructor
     * @param {String} teamName - Название команды.
     */
    function Team(teamName) {
        this.teamName = teamName;
        this._members = [];
        this._tasks = [];
    };

    /**
     * Проверяет находится ли студент в команде
     * @param {Student} - Студент
     * @return {Boolean} - true в случае если студент в команде
     */
    Team.prototype.hasMember = function(student) {
        for (var i = 0; i < this._members.length; i++) {
            if (this._members[i] === student) {
                return true;
            }
        }

        return false;
    }

    /**
     * Добавляет студента в члены команды
     * Добавляет только, если он не находится в какой-то команде
     * @param {Student}
     * @returns {Boolean} - true в случае успешного добавления студента
     */
    Team.prototype.addMember = function(student) {
        if (Teams.getMemberTeam(student)) {
            return false;
        }

        this._members.push(student);
        return true;
    }

    /**
     * Возвращает всех студентов комады 
     * @return {Array} - массив всех студентов в команде
     */
    Team.prototype.getAllMembers = function() {
        return this._members;
    }

    /**
     * Сериализует команду в массив
     * @return {Array}
     */
    Team.prototype.serialize = function() {
        return [
            this.teamName,
            this._members.map(function(student) {
                return Students.getStudentId(student);
            }),
            this._tasks
        ];
    }

    /**
     * Удаляет всех студентов из команды, либо удаляет только заданного
     * @param {Student} - Студент
     */
    Team.prototype.delMember = function(student) {
        if (student === undefined) {
            this._members = [];
            return true;
        }
        
        for (var i = 0; i < this._members.length; i++) {
            if (this._members[i] === student) {
                this._members.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    /**
     * Добавляет задачу команде
     * @param {Task} task - задача
     */
    Team.prototype.addTask = function(task) {
        this._tasks.push({
            task: task,
            mark: null
        });
    }

    /**
     * Выставляет оценку за задачу
     * @param  {Task} task задача
     * @param  {Number} mark - оценка
     */
    Team.prototype.assignMark = function(task, mark) {
        for (var i = 0; i < this._tasks.length; i++) {
            if (task == this._tasks[i].task) {
                this._tasks[i].mark = mark;
            }
        }
    }


    // ----------------------------------Задания---------------------

    var Tasks = {

        /**
         * Массив задач.
         * @constructor
         * @type {Array}
         */
        _tasks: [],

        /**
         * Добавляет новую задачу в массив задач
         * @param {String} tasksName - Наиманование задачи.
         * @param {String} description - Подробное описание задачи.
         * @return {Number} Возвращает индекс в массиве _tasks.
         */
        create: function(taskName, description) {
            this._tasks.push(new Task(taskName, description));
            return this._tasks.length - 1;
        },

        /**
         * Возвращает задачу
         * @param  {Number} taskId Индекс задачи в массиве _tasks.
         * @return {Task} Задача.
         */
        get: function(taskId) {
            return this._tasks[taskId];
        },

        /**
         * Возвращает индекс задачи в массиве _tasks.
         * @param {Task} task - задача.
         * @return {Number|Null} - Возвращает индекс задачи в массиве _tasks
         *                                      а при его отсутствии - null.
         */
        getId: function(task) {
            for (var i = 0; i < this._tasks.length; i++) {
                if (task === this._tasks[i]) {
                    return i;
                }
            }

            return null;
        },

        /**
         * Возвращает массив задач
         * @return {Array}
         */
        getAll: function() {
            return this._tasks;
        },

        /**
         * Удаляет все задачи, либо удаляет указанную задачу. 
         * @param {Number} [id] - индекс задачи в массиве _tasks.
         */
        delete: function(id) {
            if (id === undefined) {
                this._tasks = [];
            } else {
                this._tasks.splice(id, 1);
            }
        },
    };

    /**
     * Класс задача
     * @constructor
     * @param {String} taskName - Наименование задачи
     * @param {String} description - Условие задачи
     */
    function Task(taskName, description) {
        this.taskName = taskName;
        this.description = description;
    }

    /**
     * Сериализует задачу в массив
     * @return {Array}
     */
    Task.prototype.serialize = function() {
        return [this.taskName, this.description];
    }


//---------------Менторы------------------------------

    var Mentors = {

        /**
         * Внутренний массив для хранения менторов
         * @type {Array}
         * @private
         */
        _mentors: [],

        /**
         * Возвращает массив менторов
         * @return {Array}
         */
        getAll: function() {
            return this._mentors;
        },

        /**
         * Добавляет ментора в массив _mentors
         * @param {String} firstName Имя
         * @param {String} lastName Фамилие
         * @return {Number} Возвращает индекс в массиве _mentors
         */
        add: function(firstName, lastName) {
            this._mentors.push(new Mentor(firstName, lastName));
            return this._mentors.length - 1;
        },

        /**
         * Возвращает ментора
         * @param  {Number} индекс массива _mentors
         * @return {Mentor}   
         */
        getMentor: function(id) {
            return this._mentors[id];
        },

        /**
         * Возвращает индекс ментора в массиве _mentors.
         * @param {Mentor} mentor - Ментор.
         * @return {Number|Null} - Возвращает индекс ментора в массиве _mentors
         *                                          а при его отсутствии - null
         */
        getId: function(mentor) {
            for (var i = 0; i < this._mentors.length; i++) {
                if (mentor === this._mentors[i]) {
                    return i;
                }
            }
            return null;
        },

        /**
         * Удаляет всех менторов, либо указанного. 
         * @param {Number} [id] - индекс ментора в массиве _mentors.
         */
        delete: function(id) {
            if (id === undefined) {
                this._mentors = [];
            } else {
                this._mentors.splice(id, 1);
            }
        },

        /**
         * Каждому ментору случайным образом назначаем двух студентов.
         * TODO: назначать случайное или заданное количество студентов
         * @param {Array} [students] - массив студентов.
         */
        assignStudents: function(students) {
            if (!students.length) {
                return;
            }

            var mentors = this._mentors;

            for (var i = 0; i < mentors.length; i++) {
                var randomStudentIndex = Math.floor(Math.random() * students.length);
                mentors[i].addStudent(students[randomStudentIndex]);
                while (true) {
                    var nextRandomStudentIndex = Math.floor(Math.random() * students.length);
                    if (randomStudentIndex !== nextRandomStudentIndex) {
                        mentors[i].addStudent(students[nextRandomStudentIndex]);
                        break;
                    }
                }
            }
        }
    };

    /**
     * Класс ментор
     * @constructor
     * @param {String} firstName - Имя
     * @param {String} lastName - Фамилие
     */
    function Mentor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
        this._students = [];
    }

    /**
     * Добавляет студента, в котором заинтересован ментор
     * @param {Student} student - студент
     */
    Mentor.prototype.addStudent = function(student) {
        this._students.push(student);
    }

    /**
     * Возвращает студентов в которых заинтересован ментор
     * @return {Array} - Массив студентов заинтересовавших ментора.
     */
    Mentor.prototype.getStudents = function() {
        return this._students;
    }

    /**
     * Удаляет всех студентов у ментора, либо удаляет только заданного
     * @param {Nember} [idStudent] Индекс студента в массиве студентов
     */
    Mentor.prototype.deleteStudents = function(idStudent) {
        if (id === undefined) {
            this._students = [];
        } else {
            this._students.splice(idStudent, 1) ;
        }
    }

    /**
     * Сериализует менторов в массив
     * @return {Array}
     */
    Mentor.prototype.serialize = function() {
        return [this.firstName, this.lastName, this._students.map(function(student) {
            return Students.getStudentId(student);
        })];
    }

    /**
     * Возвращает массив распределения студентов среди менторов 
     * в соответствии с приоритизированными списками. 
     * @param {Mentor} mentor - Ментор
     * @param {Student} student - Студент
     */
    function assign(mentors, students) {
        var mentorProtege = [];

        // 1-й шаг: ищем пары
        for (var i = 0; i < mentors.length; i++) {
            var mentor = mentors[i],
                mentorStudents = mentor.getStudents(),
                protege = [];

            for (var j = 0; j < mentorStudents.length; j++) {
                var studentMentors = mentorStudents[j].getMentors();

                if (studentMentors.indexOf(mentor) >= 0) {
                    protege.push(mentorStudents[j]);
                }
            }

            if (protege.length) {
                mentorProtege.push( { mentor: mentor, protege: protege } );
            }
        }

        function getStudentsPairs(student) {
            var result = [];

            for (var i = 0; i < mentorProtege.length; i++) {
                if (mentorProtege[i].protege.indexOf(student) >= 0) {
                    result.push(mentorProtege[i]);
                }
            }

            return result;
        }

        // 2-й шаг: несколько связей одного студента, то оставляем приоритетную
        for (var i = 0; i < students.length; i++) {
            var pairs = getStudentsPairs(students[i]);
            if (pairs.length > 1) {
                // получаем приоритетного ментора
                var bestMentor = students[i].getMentors()[0];

                for (var j = 0; j < pairs.length; j++) {
                    if (pairs[j].mentor !== bestMentor) {
                        // удаляем студента из всех менторов, кроме приоритетного
                        pairs[j].protege.splice(pairs[j].protege.indexOf(students[i]), 1);
                    }
                }
            }
        }

        return mentorProtege;

    }


    function serialize() {
        return {
            students: Students.getAll().map(function(student) {
                return student.serialize();
            }),
            teams: Teams.getAll().map(function(team) {
                return team.serialize();
            }),
            tasks: Tasks.getAll().map(function(task) {
                return task.serialize();
            }),
            mentors: Mentors.getAll().map(function(mentor) {
                return mentor.serialize();
            })
        }
    }

    function deserialize(source) {
        Tasks.delete();
        for (var i = 0; i < source.tasks.length; i++) {
            Tasks.create(source.tasks[i][0], source.tasks[i][1])
        }

        Students.delete();
        for (var i = 0; i < source.students.length; i++) {
            var studentParam = source.students[i],
                studentId = Students.add(studentParam[0], studentParam[1]),
                student = Students.getStudent(i),
                tasks = source.students[i][2];

            for (var j = 0; j < tasks.length; j++) {
                student.addTask(tasks[j].task);
                student.assignMark(tasks[j].task, tasks[j].mark);
            }
        }

        Teams.delete();
        for (var i = 0; i < source.teams.length; i++) {
            var teamParams = source.teams[i],
                teamMembers = teamParams[1],
                team = Teams.create(teamParams[0]),
                tasks = source.students[i][2];

            for (var j = 0; j < teamMembers.length; j++) {
                team.addMember(Students.getStudent(teamMembers[j]));
            }

            for (var j = 0; j < tasks.length; j++) {
                team.addTask(tasks[j].task);
                team.assignMark(tasks[j].task, tasks[j].mark);
            }
        }

        Mentors.delete();
        for (var i = 0; i < source.mentors.length; i++) {
            var mentorParams = source.mentors[i],
                mentorId = Mentors.add(mentorParams[0], mentorParams[1]),
                mentor = Mentors.getMentor(mentorId),
                protege = mentorParams[2];

            for (var j = 0; j < protege.length; j++) {
                mentor.addStudent(Students.getStudent(protege[j]));
            }
        }

        for (var i = 0; i < source.students.length; i++) {
            var student = Students.getStudent(i),
                mentors = source.students[i][3];

            for (var j = 0; j < mentors.length; j++) {
                student.addMentor(Mentors.getMentor(mentors[j]));
            }
        }
    }

    var SHRI = {
        Students: Students,
        Student: Student,
        Teams: Teams,
        Team: Team,
        Tasks: Tasks,
        Task: Task,
        Mentors: Mentors,
        Mentor: Mentor,
        assign: assign,
        serialize: serialize,
        deserialize: deserialize
    };

    if (typeof module === 'object' && module.exports) {
        module.exports = SHRI;
    } else {
        window.SHRI = SHRI;
    }

}());