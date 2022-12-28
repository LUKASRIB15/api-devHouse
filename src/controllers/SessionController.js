// Métodos usados: index, show, destroy, update, store
// Sessão: Informação contida em uma tabela do banco
/*
    index: Listagem das sessões
    show: Listagem de uma única sessão
    destroy: Quando se quer deletar uma sessão
    update: Quando se quer atualizar uma sessão
    store: Quando se quer criar uma nova sessão
*/
import * as yup from 'yup';
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
        });
        const { email } = request.body;

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Deve ser cadastrado um email' });
        }
        // Verificando se o email já existe
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
            return response.json(user);
        }
        return response.json(user);
    }
}

export default new SessionController();
