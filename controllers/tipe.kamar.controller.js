/** load model for `members` table */
const tipe_kamarModel = require(`../models/index`).tipe_kamar
const upload = require(`./upload`).single(`foto`)
const Op = require(`sequelize`).Op
const path = require(`path`)
const fs = require(`fs`)

/** create function for read all data */
exports.getAllTipekamar = async (request, response) => {
    /** call findAll() to get all data */
    let tipe_kamars = await tipe_kamarModel.findAll()
    return response.json({
    success: true,
    data: tipe_kamars,
    message: `All Users have been loaded`
    })
    }
/** create function for filter */
exports.findTipekamar = async (request, response) => {
    /** define keyword to find data */
    let nama_tipe_kamar = request.body.nama_tipe_kamar
    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let tipekamar = await tipe_kamarModel.findOne({
    where: {
    [Op.or]: [
    { nama_tipe_kamar: { [Op.substring]: nama_tipe_kamar } }
    // { gender: { [Op.substring]: keyword } },
    // { address: { [Op.substring]: keyword } }
    ]
    }
    })
    return response.json({
        success: true,
        data: tipekamar,
        message: `All users have been loaded`
        })
        }
/** create function for add new member */
/** create function for add new member */
exports.addTipekamar = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ 
                message: error 
            })
        }
        if (!request.file) {
            return response.json({ 
                message: `Nothing to Upload`
            })
        }

        let newTipe_kamar = {
            nama_tipe_kamar: request.body.nama_tipe_kamar,
            harga: request.body.harga,
            deskripsi: request.body.deskripsi,
            foto: request.file.filename
        }

        
    tipe_kamarModel.create(newTipe_kamar)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New Tipe Kamar has been inserted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })        
}
exports.updateTipekamar = (request, response) => {
    upload(request, response, async error => {
    if (error) {
    return response.json({ message: error })
    }
    let id = request.params.id
    let tipe_kamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi
    }

    if (request.file) {
   
    const selectedFoto = await tipe_kamarModel.findOne({
    where: { id: id }
    })
    const oldFoto = selectedFoto.foto
    const pathFoto = path.join(__dirname, `../gambar`,oldFoto)
    if (fs.existsSync(pathFoto)) {
    fs.unlink(pathFoto, error =>
    console.log(error))
    }
tipe_kamar.foto = request.file.filename
}

tipe_kamarModel.update(tipe_kamar, { where: { id: id } })
.then(result => {

return response.json({
success: true,
message: `Data tipe kamar has been updated`
})
})
.catch(error => {
/** if update's process fail */
return response.json({
})
})
})
}

exports.deleteTipekamar = async (request, response) => {
    const id = request.params.id
    const tipe_kamar = await tipe_kamarModel.findOne({ where: { id: id } })
    const oldFoto = tipe_kamar.foto
    const pathFoto = path.join(__dirname, `../cover`,oldFoto)

    if (fs.existsSync(pathFoto)) {
    fs.unlink(pathFoto, error => console.log(error))
    }
    
tipe_kamarModel.destroy({ where: { id: id } })
.then(result => {
return response.json({
success: true,
message: `Data tipe_kamar has been deleted`
})
})
.catch(error => {

return response.json({
success: false,
message: error.message
})
})
}
