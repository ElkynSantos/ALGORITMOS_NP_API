import { studentKnapsack, comunityKnapasack} from "../utils.js";


export const studentKnapsackController = (req, res) => {
    try {
        const { items, pesoMax } = req.body;
        if (items.length === 0  || pesoMax <= 0) {
           return res.status(400).json({ mensaje: "Faltan valores, pesos o pesoMax en la solicitud" });
        }
        const start = performance.now();
        const resultadomini = studentKnapsack(items, pesoMax);
        const end = performance.now();
        const time = end - start;
        const resultado = {
            res: resultadomini,
            time: time
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
        const { items, pesoMax } = req.body;
        if (items.length === 0  || pesoMax <= 0) {
           return res.status(400).json({ mensaje: "Faltan valores, pesos o pesoMax en la solicitud" });
        }
        const start = performance.now();
        const resultadomini = comunityKnapasack(items, pesoMax);
        const end = performance.now();
        const time = end - start;
        const resultado = {
            res: resultadomini,
            time: time
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





      