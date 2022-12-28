/*
    Arquivo para configurar a entrada de imagens 
    no projeto e sua localização. 
*/

import multer from "multer"
import path from "path"

export default {
    //Armazenando o arquivo no disco
    storage: multer.diskStorage({
        //Direcionando os arquivos para uma pasta onde ficará armazenado
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callBack) => {
            //Pega a extensão do arquivo
            const ext = path.extname(file.originalname);
            //Pegando o nome do projeto com a extensão (ext)
            const name = path.basename(file.originalname, ext);

            callBack(null, `${name}-${Date.now()}${ext}`)
        },
    })
}