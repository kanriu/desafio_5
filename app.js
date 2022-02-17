const express = require("express");
const path = require("path");
const app = express();

const pugRouter = require("./routes/pug");
const ejsRouter = require("./routes/ejs");
const hbsRouter = require("./routes/hbs");

const pugEngine = require("./engine/pug");
const ejsEngine = require("./engine/ejs");
const hbsEngine = require("./engine/hbs");

const PORT = process.env.PORT || 8080;

//Descomentar si se quiere usar "Pug" y comentar los demas "engine"
pugEngine(app);
//Descomentar si se quiere usar "Ejs" y comentar los demas "engine"
//ejsEngine(app);
//Descomentar si se quiere usar "Hbs" y comentar los demas "engine"
//hbsEngine(app, path);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/pug", pugRouter);
app.use("/ejs", ejsRouter);
app.use("/hbs", hbsRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
