import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan"; //Logger for node.js
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import requestLogger from "./utilities/requestLogger.js";
import fs from "fs";
import helmet from "helmet"; //Secure the headers from attackers. It has list of middlewares

import swaggerUi from "swagger-ui-express"; //UI FOR API
import swaggerJSDoc from "swagger-jsdoc"; // DOCS FOR API

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const date =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1) +
  "-" +
  new Date().getDate();
logger.token("body", (req, res) => JSON.stringify(req.body));
console.log(app.get("env"));
app.use(
  logger(
    "combined",
    // FORMAT TO DISPLAY BODY IN LOG //":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]",
    {
      // stream: fs.createWriteStream(`logs/morgan_${date}`, { flags: "a" }),
    }
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);
app.use(helmet());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Notes",
      description:
        "This is REST API application created with Exoress. It help to fetch, create, update and delete notes",
      version: "1.0.0",
      contact: {
        name: "FAI",
        // url: "https://www.somealex.com",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/index.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
