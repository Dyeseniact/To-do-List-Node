

require('colors');

//const { mostrarMenu, pausa}= require('./helpers/mensajes');

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    
    let opt ='';
    const tareas = new Tareas();
    const  tareasDB = leerDB();

    if (tareasDB ){//Cargar tareas 
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //Esta funcion imprime menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1': 
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;

            case '2': 
                tareas.listadoCompleto();
            break;
            case '3': //listar completadas
                tareas.listarPendientesCopletadas();
            break;
            case '4': //listar pendientes
                tareas.listarPendientesCopletadas(false);
            break;
            case '5':// completado o pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);


            break;
            case '6': //Borrar Tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if( id !== '0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if (ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente');
                    }

                }
               
            break;

        }


        
        guardarDB( tareas.listadoArr);

        console.log('\n');
        await pausa();

        

    }while(opt !== '0');
    
    

}

main();