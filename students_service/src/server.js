const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api.js");
const commRoutes = require("./routes/communicator.js");
const soapRoutes = require('./routes/soap.js')
const errorHandler = require("./error_handler.js");
const fs           = require('fs');
const path = require('path')
const app = express();

if (process.env.NODE_ENV === "dev") {
	app.disable("view cache");
}

app.use(express.json());
app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(
	"*",
	bodyParser.urlencoded({
		extended: true,
		limit: "2mb"
	})
);

app.get("/", function(req, res, next) {
	res.send('3');
});
app.use("/api", apiRoutes);
app.use("/communicate", commRoutes);

app.get("/wsdlfile", function(req,res,next) {
		const xml = fs.readFileSync(path.resolve(__dirname, "./communicator.wsdl"), "utf8");
		var xmlnewip = xml.replace(new RegExp('localhost:3000', 'g'), req.headers.host)
		res.set('Content-Type', 'text/xml');
		res.end(xmlnewip);
})

app.use(errorHandler);

app.listen(3000, function() {
    soapRoutes(app)
});