import http from "http";

const port = 3000;

/*
 *     Utils
 */

const setResponse = (res, obj, statusCode) => {
	res.statusCode = statusCode || 200;
	res.setHeader("Content-Type", "application/json;charset=utf-8");
	return JSON.stringify(obj);
};

const errorResoponse = (statusCode, res) => {
	if (statusCode == 400) {
		const obj = {
			status: "fail",
			message: "Page not found",
		};
		res.end(setResponse(res, obj, statusCode));
	}
};

const parseData = (req) => {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", () => {
			req.data = JSON.parse(body);
			resolve(req.data);
		});
	});
};

/*
 *     Features
 */

const signup = async (req, res) => {
	const ans = {
		status: "success",
		message: req.data,
	};
	res.end(setResponse(res, ans, 200));
};





/*
 *     Server Steup
 */

const server = http.createServer(async (req, res) => {
	await parseData(req);
	if (req.method === "GET") return handleGetRequest(req, res);
	else if (req.method === "POST") return handlePostRequest(req, res);
	else if (req.method === "PUT") return handlePostRequest(req, res);
	else if (req.method === "DELETE") return handlePostRequest(req, res);
});

const handlePostRequest = (req, res) => {
	console.log(req.url);
	if (req.url === "/signup") return signup(req, res);
	return errorResoponse(404, res);
};

server.listen(port, () => {
	console.log(`server is listening on ${port}`);
});
