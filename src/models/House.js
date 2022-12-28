import { Schema, model } from "mongoose"

const HouseSchema = new Schema({
        thumbnail: String,
        description: String,
        price: Number,
        location: String,
        status: Boolean,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    //Permitindo esse aparecimento da URL no envio JSON
    {
        toJSON: {
            virtuals: true
        }
    });

//Criando uma URL para acessar a imagem
//Ele cria um campo no envio JSON, mas não cria um campo na tabela do banco
HouseSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`;
})
export default model('House', HouseSchema);