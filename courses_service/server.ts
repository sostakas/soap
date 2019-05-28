import * as express from "express";
import Shop from "./shop/shop";
import shopAPI from "./shop/shopAPI";
import errorHandler from "./util/errHandler";

let app = express();

let shop = new Shop();
shop.add({ name: "Web Services Course", price: 1 });
shop.remove(0);
shop.add({ name: "Math Course", price: 10 });
shop.add({ name: "C++ Course", price: 3.5 });

app.use("/shop", shopAPI(shop));
app.use(errorHandler);

app.get("/", (req, res) => {
	res.send("1");
});

app.listen(3001, function() {
	console.log("Server started!");
});
