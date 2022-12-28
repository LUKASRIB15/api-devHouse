import House from "../models/House";

class DashboardController {
    async show(request, response) {
        const { user_id } = request.headers;

        const userHouses = await House.find({ user: user_id });

        response.json(userHouses);
    }
}

export default new DashboardController();