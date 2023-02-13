/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */

app.use(express.json())
/** load member's controller */
const kamarController =
require(`../controllers/kamar.controller`)
/** create route to get data with method "GET" */
app.get("/get", kamarController.getAllRoom)
/** create route to add new member using method "POST" */
app.post("/add", kamarController.addRoom)
/** create route to find member
* using method "POST" and path "find" */
app.post("/find", kamarController.findRoom)
/** create route to update member
* using method "PUT" and define parameter for "id" */
app.put("/update/:id", kamarController.updateRoom)

app.delete("/delete/:id", kamarController.deleteRoom)

module.exports = app