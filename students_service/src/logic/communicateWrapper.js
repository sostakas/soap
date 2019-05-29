const Promise = require("bluebird");
const communicator = require("../logic/communicator");
const dataStorage = require('../logic/dataStorage')
const _ = require('lodash')
const studentsLogic = require("../logic/students");

class CommunicateWrapper {
    getCourses() {
        return communicator.getCourses();
    }

    addCourse(courseId, studentId) {
        return Promise.try(async function() {
            console.log('inside try')
            const student = dataStorage.get(studentId);
            if (!student) throw new Error(`student ${studentId} does not exist!`);
    
            const course = await communicator.getCourse(courseId);
            if (!course) throw new Error("Invalid course");
    
            
            dataStorage.update(studentId, {
                courses: [course]
            });
            return null;
        })
    } 

    addCourse2(courseId, studentId) {
        return Promise.try(async function() {
            // add to courses
        })
    } 

    addStudent(courseId, studentId) {
        return Promise.try(async function() {
            // add to students
        })
    } 
    getStudents() {
        const allStudents = dataStorage.getAll();
        const studentsWithIds = _.map(allStudents, (student, studentId) => {
            return {
                id: studentId,
                ...student
            };
        });
    
        return Promise.try(function() {
            return Promise.map(studentsWithIds, function(student) {
                return studentsLogic.attachCoursesToStudent(student);
            });
        }).then(function(studentsWithCourses) {
            console.dir(studentsWithCourses);
            return studentsWithCourses
        })
    } 
    async getStudent(studentId) {
        students = await this.getStudents();
        const kStudents = _.keyBy(students, 'id')
        return kStudents[studentId];
    }
}

module.exports = new CommunicateWrapper();