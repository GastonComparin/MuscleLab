const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../auth.js");
require("./db.js");
const session = require("express-session");

const server = express();
server.use(session({ secret: "cats" }));
server.use(passport.initialize());
server.use(passport.session());
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

{
//? MIDDLEWARE------------------------------------
// const verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const token = bearerHeader.split(" ")[1];
//     req.token = token;
//     next();
//   } else {
//     res.status(403);
//   }
// };
// //? PETICIONES---------------------------------------------
// //*cuando el usuario inica sesion se llama a la funcion jwt.sign para crearle un token
// server.post("/prueba/login", (req, res) => {
//   const user = {
//     name: "gaston",
//     email: "gaston@mail.com",
//     isAdmin: true,
//   };
//   jwt.sign({ user: user }, "secretKey", { expiresIn: "2h" }, (err, token) => {
//     res.json({
//       token: token,
//     });
//   });
// });

// //?Funcion de ejemplo para comprobar token
// server.post("/prueba/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretKey", (error, authData) => {
//     if (error) {
//       res.status(403).json({ mensaje: "Acceso denegado" });
//     } else {
//       res.json({
//         mensaje: "post fue creado",
//         authData: authData,
//       });
//     }
//   });
// });
// //? Ruta protegida, a la que solo tiene acceso quien sea admin
// server.get("/password", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretKey", (error, authData) => {
//     if (!authData.user.isAdmin) {
//       res.status(403).json({ mensaje: "acceso denegado" });
//     } else {
//       res.json({ contraseñas: ["clave 1", "clave 2", "clave 3"] });
//     }
//   });
// });
}


isLooggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
server.get("/", (req, res) => {
  res.send('<a href="/auth/google">Auth with google </a>');
});
server.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
server.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);
server.get("/auth/failure", (req, res) => {
  res.send("something went wrong..");
});

server.get("/protected", isLooggedIn, (req, res) => {
  console.log(req.user);
  res.send(`Hola! ${req.user.fullName}`);
});
server.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("ADIOS");
});
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
