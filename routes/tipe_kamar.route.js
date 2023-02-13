const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */

app.use(express.json())
/** load member's controller */
const tipe_kamarController =
require(`../controllers/tipe.kamar.controller`)

app.get("/get", tipe_kamarController.getAllTipekamar)
app.post("/add", tipe_kamarController.addTipekamar)
app.put("/update/:id", tipe_kamarController.updateTipekamar)
app.delete("/delete/:id", tipe_kamarController.deleteTipekamar)
module.exports = app