import Node from "./nodo.js";

class Grafo {
    constructor() {
        this.listaAdyacencia = new Map();
    }

    agregarNodo(label) {
        if (!this.listaAdyacencia.has(label)) {
            this.listaAdyacencia.set(label, new Node(label));
        }
    }

    getNodo(label) {
        if (this.listaAdyacencia.has(label)) {
            return this.listaAdyacencia.get(label);
        }
        return undefined;
    }

    agregarArista(origen, destino) {
        this.agregarNodo(origen);
        this.agregarNodo(destino);
        if (this.listaAdyacencia.has(origen) && this.listaAdyacencia.has(destino)) {
            this.listaAdyacencia.get(origen).addAdyacentes(this.listaAdyacencia.get(destino));
            this.listaAdyacencia.get(destino).addAdyacentes(this.listaAdyacencia.get(origen));
        }
    }

    getListaAdyacencia() {
        return Array.from(this.listaAdyacencia.values());
    }

    static fromJSON(json) {
        let grafo = new Grafo();
        for (let nodo in json) {
            grafo.agregarNodo(nodo);
        }
        for (let nodo in json) {
            json[nodo].forEach(destino => grafo.agregarArista(nodo, destino));
        }
        return grafo;
    }

    mostrarGrafo() {
        for (let [pos, nodo] of this.listaAdyacencia) {
            console.log(`${pos} -> ${nodo.getAdyacentes().map(n => n.label).join(', ')}`);
        }
    }

    convertirGraph() {
        const graph = {};
        this.listaAdyacencia.forEach(nodo => {
            graph[nodo.label] = nodo.getAdyacentes().map(n => n.label);
        });
        return graph;
    }
}

export default Grafo;