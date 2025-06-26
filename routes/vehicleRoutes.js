const router = require("express").Router();

const {
  createVehicle,
  create_vehicle_view,
  getAllVehicles,
} = require("../controllers/vehicleController");
const upload = require("../middleware/uploadMiddleware");

router.post("/vehicles", upload.single("image"), createVehicle);
router.get("/vehicles/create", create_vehicle_view);
router.get("/vehicles", getAllVehicles);

module.exports = router;
