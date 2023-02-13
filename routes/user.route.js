/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */

app.use(express.json())
/** load member's controller */
const userController =
require(`../controllers/user.controller`)
/** create route to get data with method "GET" */
app.get("/get", userController.getAllUser)
/** create route to add new member using method "POST" */
app.post("/add", userController.addUser)
/** create route to find member
* using method "POST" and path "find" */
app.post("/find", userController.findUser)
/** create route to update member
* using method "PUT" and define parameter for "id" */
app.put("/update/:id", userController.updateUser)

app.delete("/delete/:id", userController.deleteUser)

module.exports = app