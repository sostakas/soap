const _ = require("lodash");

const data = {
	1: { first_name: "John", last_name: "Jack", university: "UCL", courses: [{ id: 1 }] },
	2: { first_name: "Mike", last_name: "Mica", university: "FU", courses: [] },
	3: { first_name: "Aaron", last_name: "Agon", university: "ARI", courses: [] }
};

function studentPropExistValidator(student) {
	if (!student.first_name) throw new Error("first_name is missing!");
	if (!student.last_name) throw new Error("last_name is missing!");
}
function studentPropTypeValidator(student) {
	if (student.first_name && !_.isString(student.first_name)) throw new Error("Argument first_name is missing or not string!");
	if (student.last_name && !_.isString(student.last_name)) throw new Error("Argument last_name is missing or not string!");
}

function set(key, val) {
	if (!key) {
		keys = _.orderBy(Object.keys(data), "asc");
		key = Number(keys[keys.length - 1]) + 1;
	}

	if (data[key]) throw new Error("student already exists!");
	data[key] = val;
	return key;
}
function get(key) {
	return data[key];
}
function getAll() {
	return data;
}
function update(key, newInfo) {
	if (!data[key]) throw new Error("student does not exist!");
	const student = data[key];
	const objArrayElements = {};
	for (let iterKey in newInfo) {
		console.log("key: " + iterKey);
		const newInfoProp = newInfo[iterKey];
		const oldInfoProp = student[iterKey];
		console.dir(oldInfoProp);
		if (_.isArray(newInfoProp)) objArrayElements[iterKey] = [...newInfo[iterKey], ...oldInfoProp];
	}

	console.dir(objArrayElements);
	const newStudent = { ...data[key], ...newInfo, ...objArrayElements };
	data[key] = newStudent;
	return newStudent;
}
function del(key) {
	if (!data[key]) throw new Error("student does not exist!");
	delete data[key];
}

module.exports = {
	get,
	set,
	getAll,
	update,
	del,
	studentPropExistValidator,
	studentPropTypeValidator
};
