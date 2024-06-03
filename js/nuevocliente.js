
//IFEE

(function() {

    let DB;

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    });

    function conectarDB () {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('ERROR');
        }

        abrirConexion.onsuccess = function(){
            DB =  abrirConexion.result;
        }

/*         abrirConexion.onupgradeneeded = function() {

        } */
    }

    function validarCliente(e) {
        e.preventDefault();

        //LEER INPUTS

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son Obligatorios', 'error');
            return;
        }
        // CREAR OBJETO CON LA INFORMACIÓN, USANDO UN OBJECT LITERAL

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            /* id: Date.now() */
        }

        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente (cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error','error');
        }

        transaction.oncomplete = function() {
            imprimirAlerta('El cliente se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html'
            }, 2000);
        }


    }

    function imprimirAlerta(mensaje, tipo) {
        //CREAR ALERTA

        const alerta= document.querySelector('.alerta');

        if (!alerta) {
            
            const divMensaje = document.createElement('div');
    
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border');
    
            if (tipo === 'error') {
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'alerta');
            } else {
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            divMensaje.textContent = mensaje;
    
            formulario.appendChild(divMensaje);
    
            setTimeout(()=>{
                divMensaje.remove();
            },2000)
        }
    }
})();

