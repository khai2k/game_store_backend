var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var gameRouter = require("./routes/game");
var billRouter = require("./routes/bill");
var genreRouter = require("./routes/genre");
var detailGenreRouter = require("./routes/detailGenre");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/game", gameRouter);
app.use("/api/bill", billRouter);
app.use("/api/genre", genreRouter);
app.use("/api/detailGenre", detailGenreRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
