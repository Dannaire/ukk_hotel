const { request, response } = require("express");
const express = require("express");
const app = express();
// const sequelize = require("sequelize")

const roomModel = require(`../models/index`).kamar;
const tipeModel = require(`../models/index`).tipe_kamar;
const Op = require(`sequelize`).Op;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("ukk_hotel", "root", "", {
  host: "localhost",
  dialect: "mysql",
});



const bodyParser = require("body-parser");
// const upload2 = require("./upload-data-member");
// const uploada = require("./upload-data-member");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mendaptkan semua data dalam tabel
exports.getAllRoom = async (request, response) => {
  const result = await sequelize.query(
    "SELECT kamars.id,kamars.nomor_kamar,tipe_kamars.nama_tipe_kamar FROM kamars JOIN tipe_kamars ON tipe_kamars.id = kamars.id_tipe_kamar ORDER BY kamars.id ASC"
  );

  response.json(result[0]);
};

//mendaptkan salah satu data dalam tabel (where clause)
exports.findRoom = async (request, response) => {
  let nomor_kamar = request.body.nomor_kamar

  const result = await sequelize.query(
    `SELECT kamars.id,kamars.nomor_kamar,tipe_kamars.nama_tipe_kamar FROM kamars JOIN tipe_kamars ON tipe_kamars.id = kamars.id_tipe_kamar where kamars.nomor_kamar= ${nomor_kamar} ORDER BY kamars.id ASC `
  );
  return response.json({
    success: true,
    data: result[0],
    message: `Room have been loaded`,
  });
};

//menambah data
exports.addRoom = async (request, response) => {
  let nama_tipe_kamar = request.body.nama_tipe_kamar;
  let tipeId = await tipeModel.findOne({
    where: {
      [Op.and]: [{ nama_tipe_kamar: { [Op.substring]: nama_tipe_kamar } }],
    },
  });
  console.log(nama_tipe_kamar);

  let newRoom = {
    nomor_kamar: request.body.nomor_kamar,
    id_tipe_kamar: tipeId.id,
  };

  console.log(newRoom);

  roomModel
    .create(newRoom)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New Member has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

//mengupdate salah satu data
exports.updateRoom = async (request, response) => {
    let nama_tipe_kamar = request.body.nama_tipe_kamar;
    let tipeId = await tipeModel.findOne({
      where: {
        [Op.and]: [{ nama_tipe_kamar: { [Op.substring]: nama_tipe_kamar } }],
      },
    });
    console.log(nama_tipe_kamar);
  
    let newRoom = {
      nomor_kamar: request.body.nomor_kamar,
      id_tipe_kamar: tipeId.id,
    };

    let idRoom=request.params.id
  roomModel
    .update(newRoom, { where: { id: idRoom } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data room has been update`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

//mengahapus salah satu data
exports.deleteRoom = (request, response) => {
  let idRoom = request.params.id;

  roomModel
    .destroy({ where: { id: idRoom } })
    .then((result) => {
      return response.json({
        success: true,
        message: `room data has ben deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};