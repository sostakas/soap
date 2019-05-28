interface Course {
	id: number;
	name: string;
	price: number;
}

export default class Shop {
	private courses: Course[] = [];
	private counter = 0;

	public add(course: Pick<Course, "name" | "price">) {
		this.courses.push({
			...course,
			id: this.counter++,
		});
	}

	public addWithId(course: Course) {
		this.courses.push(course);
	}

	private findCourseIndex(id: number) {
		return this.courses.findIndex(course => course.id == id);
	}

	public remove(id: number) {
		let i = this.findCourseIndex(id);
		if (i == -1) throw new Error('Invalid course id!');
	}

	public get() {
		return this.courses.slice();
	}

	public findId(id: number) {
		return this.courses.find(course => course.id == id);
	}

	public update(course: Course) {
		let i = this.findCourseIndex(course.id);
		this.courses[i] = course;
	}
}
