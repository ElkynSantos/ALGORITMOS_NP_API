import { studentKnpasack, comunityKnapasack} from "../utils.js";


export const studentKnapsackController = (req, res) => {
    try {
        const { valores, pesos, pesoMax } = req.body;

        if (valores === undefined || pesos === undefined || pesoMax === undefined) {
            return res.status(400).json({ mensaje: "Faltan valores, pesos o pesoMax en la solicitud" });
        }
        const start = performance.now();
        const resultadomini = studentKnpasack(valores, pesos, pesoMax);
        const end = performance.now();
        const time = end - start;
        const resultado = {
            res: resultadomini,
            tiempo: time
        }

        if (resultado) {
            res.json({ success: true, resultado: resultado });
        } else {
            res.json({ success: false, message: "Hubo un error inesperado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const comunityKnapsackController = (req, res) => {
    try {
        const { valores, pesos, pesoMax } = req.body;

        

        if (valores === undefined || pesos === undefined || pesoMax === undefined) {
            return res.status(400).json({ mensaje: "Faltan valores, pesos o pesoMax en la solicitud" });
        }

        const start = performance.now();
        const resultadomini = comunityKnapasack(pesoMax, valores, pesos);
        const end = performance.now();
        const time = end - start;
        const resultado = {
            res: resultadomini,
            tiempo: time
        }


        if (resultado) {
            res.json({ success: true, resultado:  resultado});
        } else {
            res.json({ success: false, message: "Hubo un error inesperado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};





      