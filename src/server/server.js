/* eslint-disable @typescript-eslint/no-var-requires */
// copied verbatim from https://raw.githubusercontent.com/trickjsprogram/react-jwt-auth/master/server/server.js

const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync(`${__dirname}\\users.json`, "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
  fs.readFile(`${__dirname}\\users.json`, (err, data) => {
    if (err) {
      const status = 401;
      const message = err;

      console.log("there is an error", err);
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    let user = data.users.find((user) => user.email === payload.email);
    user.access_token = token;

    fs.writeFile(
      `${__dirname}\\users.json`,
      JSON.stringify(data),
      (err, data) => {
        if (err) {
          console.log("error writing token to file");
        }
      }
    );
  });
  return token;
}

function isLoginAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function isLoggedInUserAuthenticated({ email, token }) {
  let user = userdb.users.findIndex((user) => user.email === email) !== -1;
  return user.access_token === token;
}

server.post("/api/auth/users", (req, res) => {
  let users;
  const { email, token } = req.body;

  if (isLoggedInUserAuthenticated({ email, token })) {
    const status = 401;
    const message = "Invalid login";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile(`${__dirname}\\users.json`, "utf-8", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      console.log("there is an error in reading file", err);
      res.status(status).json({ status, message });
      return;
    }
    users = JSON.parse(data.toString());
    res.status(200).json(users);
  });
});

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });

  res.status(200).json({ access_token });
});

server.listen(5000, () => {
  console.log("Running fake api json server");
});
