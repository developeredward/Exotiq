const Vehicle = require("../models/VehicleModel");
// const path = require("path");
const upload = require("../middleware/uploadMiddleware");

// Create and Save a new Vehicle

const createVehicle = async (req, res) => {
  const {
    name,
    priceDaily,
    priceMonthly,
    category,
    transmission,
    fuel,
    horsePower,
    engine,
  } = req.body;
  const image = req.file.filename;

  try {
    const newVehicle = await Vehicle.create({
      name,
      image,
      priceDaily,
      priceMonthly,
      category,
      transmission,
      fuel,
      horsePower,
      engine,
    });
    console.log(
      res.status(201).json({
        status: "success",
        data: {
          vehicle: newVehicle,
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
};

// createVehicle view

const create_vehicle_view = (req, res) => {
  res.render("vehicles/create", { title: "Create Vehicle" });
};

// Retrieve all Vehicles from the database.

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({
      status: "success",
      results: vehicles.length,
      data: {
        vehicles,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// Find a single Vehicle with an id

const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        vehicle,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// // Update a Vehicle by the id in the request

// const updateVehicle = async (req, res) => {
//   try {
//     const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: "success",
//       data: {
//         vehicle,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Delete a Vehicle with the specified id in the request

// const deleteVehicle = async (req, res) => {
//   try {
//     await Vehicle.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  createVehicle,
  create_vehicle_view,
  getAllVehicles,
  getVehicle,
  //   updateVehicle,
  //   deleteVehicle,
  upload,
};
