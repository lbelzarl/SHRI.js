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
         * @param {Number} id - номер студента в массиве _students. 
         * @return {Student} - Объект студент.
         */
        find: function(id) {
            return this._students[id];
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
                students[i].emptyMentors();
            }
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
        this.tasks = [];
        this._mentors = [];
    }

    /**
     * Добавляет ментора в массив менторов в которых заинтересован студент
     * @param {Mentor} mentor - ментор
     */
    Student.prototype.addMentor = function(mentor) {
        this._mentors.push(mentor);
    }

    /**
     * Возвращает массив менторов в которых заинтересован студент
     * @return {Array} - Массив менторов заинтересовавших студента.
     */
    Student.prototype.getMentors = function() {
        return this._mentors;
    }

    /**
     * Очищает массив менторов в которых заинтересован студент
     */
    Student.prototype.emptyMentors = function() {
        this._mentors = [];
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
         * Ищет команду.
         * @param {String|Number} team - Название команды либо ее индекс в массиве
         * @return {Team|null} При успешном поиске возвращает саму команду иначе null.
         */
        find: function(team) {
            if (typeof(team) === 'number') {
                return this._teams[team];
            }

            for (var i = 0; i < this._teams.length; i++) {
                if (team === this._teams[i].teamName) {
                    return this._teams[i];
                }
            }

            return null;
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
         * Возвращает индекс команды в массиве _teams
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
         * При вызове без параметров удаляет все команды.
         * Иначе удаляет указанною в параметре команду.
         * @param {String} teamName - Название команды.
         */
        delete: function(teamName) {
            if (teamName === undefined) {
                this._teams = [];
                return;
            }

            var team = this.find(teamName),
                teamIndex = this.getTeamId(team);

            if (teamIndex > 0) {
                this._teams.splice(teamIndex, 1);
            }
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
        this.tasks = [];
    };

    /**
     * TODO: описать
     * @param {Student}
     * @return {Boolean}
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

    //----------------------Манипуляция с командой----------------------

    var EditTeam = {

        /**
         * Удаляет студента из команды.
         * @param    {Number} idStudents - положение студента в массиве студентов.
         * @param    {Number} team - положение команды в массиве команд.
         */
        delMember: function(idStudents, team) {
            var team = Teams.find(team);
            var student = Students.find(+idStudents)
            team._members.splice(student, 1);
        }
    };



    // ----------------------------------Задания---------------------

    var Tasks = {

        /**
         * Массив задач.
         * @constructor
         * @type {Array}
         */
        _tasks: [],

        /**
         * Создает задачу
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
        }
    };

    function Task(taskName, description) {
        this.taskName = taskName;
        this.description = description;
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
        find: function(id) {
            return this._mentors[id];
        },

        /**
         * Возвращает индекс ментора в массиве _mentors.
         * @param {Mentor} mentor - Ментор.
         * @return {Number|Null} - Возвращает индекс ментора в массиве _mentors
         *                                                 а при его отсутствии - null.
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
         * При вызове без переметров удаляет всех менторов,
         * иначе удаляет указанного ментора. 
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
     * Очищает массив студентов в которых заинтересован ментор
     */
    Mentor.prototype.emptyStudents = function() {
        this._students = [];
    }

    function assign(mentors, students) {
        var mentorProtege = [];

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

        return mentorProtege;

    }


    window.SHRI = {
        Students: Students,
        Student: Student,
        Teams: Teams,
        Team: Team,
        Tasks: Tasks,
        Task: Task,
        Mentors: Mentors,
        Mentor: Mentor,
        assign: assign
    };

}());
