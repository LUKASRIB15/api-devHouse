import House from "../models/House";
import User from "../models/User";
import * as yup from "yup";

class HouseController {

    async destroy(request, response) {
        const { house_id } = request.body;
        const { user_id } = request.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if (String(user._id) !== String(house.user)) {
            response.status(401).json("Não autorizado");
        } else {
            await House.findByIdAndDelete({ _id: house_id });
        }
        response.json({ message: "House deletada com sucesso" })


    }

    async update(request, response) {
        //Criando uma validação dos campos com a biblioteca yup
        //Em formato de schema
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required()
        })

        const { filename } = request.file;
        const { house_id } = request.params;
        const { description, price, location, status } = request.body;
        const { user_id } = request.headers;

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: "Falha na validação dos campos" });
        }

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if (String(user._id) !== String(house.user)) {
            response.status(401).json({ error: "Não autorizado!" });
        } else {
            const updateHouse = await House.updateOne({ _id: house_id }, {
                thumbnail: filename,
                user: user_id,
                description,
                price,
                location,
                status
            })
        }


        response.send();
    }

    async index(request, response) {
        const { q } = request.query;
        const houses = await House.find({ status: q })

        return response.json(houses);
    }

    async store(request, response) {
        //Criando uma validação dos campos com a biblioteca yup
        //Em formato de schema
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required()
        })

        const { filename } = request.file;
        const { description, price, location, status } = request.body;
        const { user_id } = request.headers;

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: "Falha na validação dos campos" });
        }

        const house = await House.create({
            thumbnail: filename,
            user: user_id,
            description,
            price,
            location,
            status
        })

        return response.json(house);
    }
}

export default new HouseController();