const Tarea = require('./tarea');
class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id  = ''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach ( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }
    listadoCompleto(){


        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.blue;
            const {desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
            
            

        });

    }

    listarPendientesCopletadas( completadas = true){
        console.log();
        let contador = 0 ; 
        
        this.listadoArr.forEach(tarea => {

            const {desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            if ( completadas ){

                if (completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').blue} ${desc} :: ${completadoEn.blue}`);

                } 
            }else {
                if (!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').blue}. ${desc} :: ${estado}`);
                }

            }
            
            
            

        });
    }

    toogleCompletadas( ids =[] ){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
                tarea.completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;