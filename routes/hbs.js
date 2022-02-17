const { Router } = require("express");

const Producto = require("../models/Producto");

const router = new Router();
const productoModel = new Producto();

router.get("/", async (req, res) => {
  const productos = await productoModel.getAll();
  res.render("main", { productos });
});

router.get("/add", (req, res) => res.render("nueva"));

router.post("/add", async (req, res) => {
  await productoModel.save(req.body);
  res.redirect(`/hbs`);
});

module.exports = router;
