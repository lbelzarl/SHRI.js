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
        }
    };

    function Task(taskName, description) {
        this.taskName = taskName;
        this.description = description;
    }

    window.SHRI = {
        Students: Students,
        Student: Student,
        Teams: Teams,
        Team: Team,
        Tasks: Tasks,
        Task: Task
    };

}());
