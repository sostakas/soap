const commWrapper = require('../logic/communicateWrapper')
const fs = require('fs');
const path = require('path')
const soap = require('soap')

function soapRouter(app) {
    const xml = fs.readFileSync(path.resolve(__dirname, "../communicator.wsdl"), "utf8");

    function errHandler(err, cb) {
        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
            cb(new Error('Shop service is down!'));
        } else {
            console.error(err);
            cb(new Error(err.message));
        }
    };

	const CommunicatorService = {
		CommunicatorService: {
			CommunicatorPort: {
				getCourses: function(args, cb) {
					console.log("getting");
                    return commWrapper.getCourses()
                    .catch(function(err) {
                        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
                            throw new Error('Shop service is down!');
                        } else {
                            console.error(err);
                            throw new Error(err.message);
                        }
                    });
                },
                addCourses: function(args, cb) {
                    const { courseId, studentId } = args;
                    return commWrapper.addCourse(courseId, studentId)
                    .then(() => {
                        cb({result: `student ${studentId} added course ${courseId} successfully` })
                    })
                    .catch(function(err) {
                        console.dir(err);
                        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
                            throw new Error('Shop service is down!');
                        } else {
                            console.error(err);
                            throw new Error(err.message);
                        }
                    });
                },
                getStudents: function(args, cb) {
                    return commWrapper.getStudents()
                },
                getStudent: function(args, cb) {
                    const {studentId} = args
                    return commWrapper.getStudent(studentId);
                },

                addCourse: function(args, cb) {
                    const { courseId, name, price } = args;
                    return commWrapper.addCourse(courseId, name, price)
                    .then(() => {
                        cb({result: `course ${courseId}successfully` })
                    })
                    .catch(function(err) {
                        console.dir(err);
                        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
                            throw new Error('Shop service is down!');
                        } else {
                            console.error(err);
                            throw new Error(err.message);
                        }
                    });
                },

                addStudent: function(args, cb) {
                    const { courseId, name, price } = args;
                    return commWrapper.addStudent(studentId)
                    .then(() => {
                        cb({result: `student ${studentId}successfully` })
                    })
                    .catch(function(err) {
                        console.dir(err);
                        if (err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
                            throw new Error('Shop service is down!');
                        } else {
                            console.error(err);
                            throw new Error(err.message);
                        }
                    });
                },
			}
		}
	};

	soap.listen(app, "/wsdl", CommunicatorService, xml, function() {
		console.log("soap started");
	});
}

module.exports = soapRouter;