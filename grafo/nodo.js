
class Node {
    constructor(label){
        this.label = label;
        this.adyacentes = new Set();
        this.estado = "N";
    }

    addAdyacentes(node) {
        if (!this.adyacentes.has(node)){
            this.adyacentes.add(node);
        }
    }
    
    clearAdyacentes() {
        this.adyacentes.clear();
    }

    getEstado(){
        return this.estado;
    }

    setEstado(estado){
        this.estado = estado;
    }

    getAdyacentes() {
        return Array.from(this.adyacentes);
    }

    deleteAdyacente(node){
        if (this.adyacentes.has(node)){
            this.adyacentes.delete(node);
        }
    }

}

export default Node;