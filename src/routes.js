import { Router } from "express";
import multer from "multer"
import uploadConfig from "./config/upload"
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import DashboardController from "./controllers/DashboardController";
import ReserveController from "./controllers/ReserveController";

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/createSessions", SessionController.store);

routes.post("/createHouse", upload.single("thumbnail"), HouseController.store);

routes.get("/listHouses", HouseController.index);

routes.put("/detailsHouse/:house_id", upload.single("thumbnail"), HouseController.update);

routes.delete("/deleteHouse", HouseController.destroy);

routes.get("/dashboard", DashboardController.show);

routes.post("/houses/:house_id/reserve", ReserveController.store);

routes.get("/houses/reserves", ReserveController.show);

routes.delete("/deleteReserve/:reserve_id", ReserveController.destroy);
export default routes;