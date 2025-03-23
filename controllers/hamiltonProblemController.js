import { cicloHamilton, comunityHamiltonSolution } from "../utils.js";
import Grafo from "../grafo/grafo.js";

export const studentHamiltonSolution = (req, res) => {
    try {
        console.log("INICIO TODO");
        const { grafo, inicio } = req.body;
        console.log("Grafo recibido:", grafo);
        console.log("Nodo inicial:", inicio);

        const grafoReconstruido = Grafo.fromJSON(grafo);
        //grafoReconstruido.mostrarGrafo();
        const nodoInicio = grafoReconstruido.getNodo(inicio);
        if(nodoInicio === undefined){
            return res.status(400).json({ mensaje: "El nodo inicial no existe en el grafo" });
        }
        const start = performance.now();
        const resultadomini = cicloHamilton(grafoReconstruido, nodoInicio);
        const end = performance.now();
        const time = end - start;
        const resultado = {
            camino: resultadomini,
            tiempo: time
        }

        if (resultado) {
            res.json({ success: true, resultado: resultado });
        } else {
            res.json({ success: false, message: "No hay ciclo hamiltoniano" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const cominutyHamiltonSolution = (req, res) => {
    try {
        console.log("INICIO TODO");
        const { grafo, inicio } = req.body;
        console.log("Grafo recibido:", grafo);
        console.log("Nodo inicial:", inicio);

        const grafoReconstruido = Grafo.fromJSON(grafo);
        //grafoReconstruido.mostrarGrafo();
        //const nodoInicio = grafoReconstruido.getNodo(inicio);
        if(inicio === undefined){
            return res.status(400).json({ mensaje: "El nodo inicial no existe en el grafo" });
        }
        const graph = grafoReconstruido.convertirGraph();
        console.log(graph)
        const start = performance.now();
        const resultadomini = comunityHamiltonSolution(graph, [inicio]);
        const end = performance.now();
        const time = end - start;
        const resultado = {
            camino: resultadomini,
            tiempo: time
        }


        if (resultado) {
            res.json({ success: true, resultado:  resultado});
        } else {
            res.json({ success: false, message: "No hay ciclo hamiltoniano" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};





      