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
                buyCourses: function(args, cb) {
                    const { courseId, studentId } = args;
                    return commWrapper.buyCourse(courseId, studentId)
                    .then(() => {
                        cb({result: `student ${studentId} bought course ${courseId} successfully` })
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
                    console.log('getStudent()')
                    return commWrapper.getStudents()
                },
                getStudent: function(args, cb) {
                    console.log('getStudent()')
                    const {studentId} = args
                    return commWrapper.getStudent(studentId);
                }
			}
		}
	};

	soap.listen(app, "/wsdl", CommunicatorService, xml, function() {
		console.log("soap started");
	});
}

module.exports = soapRouter;