import * as express from "express";
import Shop from "./shop";
import HTTPError from "../util/HTTPError";
import { Paramsid, RequestCourse, CourseidsValType } from "./types";

export default function shopAPI(shop: Shop) {
	let router: express.Router = express.Router();

	router.use(express.json());

	router.get("/", (req, res) => {
		res.json(shop.get());
	});

	router.get("/multiple", (req, res) => {
		console.dir(req.body);
		let validation = CourseidsValType.decode(req.body);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid data");

		let courseReqBody = validation.value;
		let courses = courseReqBody.courses.map(function(id) {
			let course = shop.findId(id);
			if (!course) throw new HTTPError(400, "Course " + id + " does not exist");
			return course;
		});

		res.json(courses);
	});

	router.get("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);

		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");

		let params = validation.value;
		let course = shop.findId(params.id);
		if (course == undefined) throw new HTTPError(404, "Course not found");
		res.json(course);
	});

	router.post("/", (req, res) => {
		let validation = RequestCourse.decode(req.body);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid data");

		let course = validation.value;
		shop.add(course);
		res.status(201).end();
	});

	router.delete("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);

		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");
		let params = validation.value;

		shop.remove(params.id);
		res.end();
	});

	router.put("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");

		let bodyValidation = RequestCourse.decode(req.body);
		if (!bodyValidation.isRight()) throw new HTTPError(400, "Invalid data");

		let params = validation.value;
		let course = bodyValidation.value;
		let courseWithId = { ...course, id: params.id };


		if (shop.findId(params.id) == null) {
			shop.addWithId(courseWithId);
			res.status(201);
		} else {
			shop.update(courseWithId);
		}

		res.end();
	});

	router.patch("/:id", (req, res) => {
		let validation = Paramsid.decode(req.params);
		if (!validation.isRight()) throw new HTTPError(400, "Invalid params");

		let bodyValidation = RequestCourse.decode(req.body);
		if (!bodyValidation.isRight()) throw new HTTPError(400, "Invalid data");

		let params = validation.value;
		let course = bodyValidation.value;
		let courseWithId = { ...course, id: params.id};

		if (shop.findId(params.id) == null) throw new HTTPError(404, "Course not found");

		shop.update(courseWithId);

		res.end();
	});

	return router;
}
