const express = require(`express`)
const app = express()
app.use(express.json())
const pemesananController = require(`../controllers/pemesanan.controller`)

app.get("/", pemesananController.getAllPemesanan)
app.post("/add", pemesananController.addPemesanan)
app.post("/find", pemesananController.findPemesanan)
app.put("/:id", pemesananController.updatePemesanan)
app.delete("/:id", pemesananController.deletePemesanan)

module.exports = app