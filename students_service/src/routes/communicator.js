const express = require("express");
const Promise = require("bluebird");
const _ = require("lodash");
const commWrapper = require('../logic/communicateWrapper');

var router = express.Router();

router.get("/courses", function(req, res, next) {
	Promise.try(function() {
		return commWrapper.getCourses()
	})
    .then(function(courses) {
        console.log("sending succ resp");
        res.json(courses);
    })
    .catch(function(e) {
        next(e);
    });
});

function bodyValidator(req, res, next) {
	req.body.courseId = Number(req.body.courseId);
	req.body.studentId = Number(req.body.studentId);

	try {
		if (!_.isInteger(req.body.courseId)) throw new Error("Invalid course id parameter");
		if (!_.isInteger(req.body.studentId)) throw new Error("Invalid student id parameter");
	} catch (e) {
		res.status(400);
		next(e);
	}

	next();
}

router.post("/course", bodyValidator, function(req, res, next) {
	const courseId = req.body.courseId;
	const studentId = req.body.studentId;

	Promise.try(async function() {
        await commWrapper.getCourses(courseId, studentId)
		res.json({
			message: `student ${studentId} bought course ${courseId} successfully`
		});
	}).catch(function(e) {
		next(e);
	});
});

module.exports = router;
