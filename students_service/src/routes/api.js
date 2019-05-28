const express = require("express");
const dataStorage = require("../logic/dataStorage");
var router = express.Router();
const commWrapper = require('../logic/communicateWrapper')

function dataValidator(req, res, next) {
	req.body.balance = Number(req.body.balance);

	try {
		dataStorage.studentPropExistValidator(req.body);
		dataStorage.studentPropTypeValidator(req.body);
	} catch (e) {
		res.status(400);
		next(e);
	}

	next();
}

function studentExistChecker(req, res, next) {
	const student = dataStorage.get(req.params.id);
	if (!student) {
		res.status(404);
		throw new Error("student does not exist!");
	} else {
		next();
	}
}

router.get("/students", async function(req, res, next) {
    const studentsWithCourses = await commWrapper.getStudents()
    res.json(studentsWithCourses);
})

router.get("/students/:id", studentExistChecker, async function(req, res, next) {
	const studentId = req.params.id;
    const student = await commWrapper.getStudent(studentId);
	res.json(student);
});

router.post("/students", dataValidator, function(req, res, next) {
	let key = dataStorage.set(null, req.body);

	let json = {};
	json[key] = { balance: req.body.balance, first_name: req.body.first_name };
	res.status(201).json(json);
});

router.put("/students/:id", dataValidator, function(req, res, next) {
	const studentId = req.params.id;
	const student = dataStorage.get(studentId);

	if (student) {
		let updated = dataStorage.update(studentId, req.body);
		let json = {};
		json[studentId] = updated;
		res.json(json);
	} else {
		dataStorage.set(studentId, req.body);
		res.status(201);
	}

	res.end();
});

router.patch("/students/:id", studentExistChecker, dataValidator, function(req, res, next) {
	const studentId = req.params.id;
	const student = dataStorage.get(studentId);

	let updated = dataStorage.update(studentId, req.body);

	let json = {};
	json[studentId] = updated;
	res.json(json);
});

router.delete("/students/:id", studentExistChecker, function(req, res, next) {
	const studentId = req.params.id;

	dataStorage.del(studentId);

	res.json({ deleted: true, id: studentId });
});

module.exports = router;
