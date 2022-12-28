import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController {
    async store(request, response) {
        const { user_id } = request.headers;
        const { house_id } = request.params;
        const { date } = request.body;

        /*
           Início da validação
        */

        //Se o id da casa estiver errado
        const house = await House.findById(house_id);

        if (!house) {
            return response.status(400).json({ error: "Esse Id não existe" });
        }

        //Se o status for falso, ou seja, indisponível
        if (house.status === false) {
            return response.status(401).json({ error: "Essa casa não está disponível" });
        }

        //Se o usuário que criou a casa quer reservá-la
        const user = await User.findById(user_id);

        if (String(user._id) === String(house.user)) {
            return response.status(401).json({ error: "Ação não autorizada" });
        }
        /*
            Fim da validação
        */

        const createNewReserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        //Faz com que conecte as informações baseadas com o id, retornando mais informações além do id
        await (await createNewReserve.populate('house')).populate('user');

        return response.json(createNewReserve);
    }

    async show(request, response) {
        const { user_id } = request.headers;

        const detailReserves = await Reserve
            .find({ user: user_id })
            .populate('house');

        return response.json(detailReserves);
    }

    async destroy(request, response) {
        const { reserve_id } = request.params;
        const { user_id } = request.headers;

        const user = await User.findById(user_id);
        const reserve = await Reserve.findById(reserve_id);

        if (String(user._id) !== String(reserve.user)) {
            return response.status(401).json({ error: "Não autorizado" });
        }

        await Reserve.findByIdAndDelete({ _id: reserve_id });

        return response.send();
    }
}

export default new ReserveController()