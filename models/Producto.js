const fs = require("fs").promises;
const path = require("path");

class Producto {
  constructor() {
    this.filePath = path.join(__dirname, "../database/productos.json");
  }

  async save(item) {
    try {
      let contenido = await this.getAll();
      if (!contenido) contenido = [];
      contenido.push({ id: contenido.length + 1, ...item });
      await fs.writeFile(this.filePath, JSON.stringify(contenido, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  async update(item) {
    try {
      item.id = parseInt(item.id);
      let contenido = await this.getAll();
      if (!contenido) return null;
      const index = contenido.findIndex((i) => i.id === item.id);
      if (index === -1) return null;
      contenido[index] = { ...item };
      await fs.writeFile(this.filePath, JSON.stringify(contenido, null, 2));
      return contenido.length;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      const contenido = await this.getAll();
      if (!contenido) return contenido;
      const findItem = contenido.find((item) => item.id === id);
      return findItem ? findItem : null;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.filePath, "utf-8"));
    } catch (error) {
      return null;
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.getAll();
      if (contenido) {
        const producto = await this.getById(id);
        if (!producto) return null;
        const filter = contenido.filter((item) => item.id !== id);
        await fs.writeFile(this.filePath, JSON.stringify(filter, null, 2));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.filePath, "");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Producto;
