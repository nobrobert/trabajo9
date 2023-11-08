let eventos =[];


let arr = [];



const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const botonAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

const json = cargar();

try{
   arr = JSON.parse(json);

}catch (error) {
    arr= []
}
eventos= arr?[...arr] : [];

mostarEventos();

document.querySelector("form").addEventListener("submit", e =>{
    e.preventDefault();
     agregarEvento();
});


function agregarEvento() {
    if (nombreEvento.value === "" || fechaEvento.value === "") {
        return
    }

    if (diferenciarFecha(fechaEvento.value) <0) {
     return ;   
    }

    const nuevoEvento = {
      
         id:(Math.random()*100).toString(36).slice(3),
         nombre: nombreEvento.value,
         fecha: fechaEvento.value,

    };

    eventos.unshift(nuevoEvento);
    guardar(JSON.stringify(eventos));
 
    nombreEvento.value = "";


    mostarEventos();

}


function diferenciarFecha(destino){
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();
 
     let diferencia = fechaDestino.getTime() - fechaActual.getTime();

    let dias = Math.ceil(diferencia / (1000 * 3600 * 24));
  
    return dias;
}

function mostarEventos (){
  
    const eventosHTML = eventos.map((evento) => {
        return `
        
        <div class="evento">
           <div class="dias">
           <span class="diasFaltantes">${diferenciarFecha(evento.fecha)}</span> 
           <span class="texto"> dias para</span>
           </div>

            <div class="nombreEvento">${evento.nombre}</div>
            <div class="fechaEvento">${evento.fecha}</div>
            <div class="acciones">
            <!-- le de un id a cada boton para luego solo eliminar los eventos que to necesite elminar y no todos y para eso tenga en cuenta el id del evento --> 
            <button data-id="${evento.id}" class="eliminar">Eliminar</eliminar>
            </div>

           
        </div>
        
        `;
    });
    listaEventos.innerHTML = eventosHTML.join("");
    document.querySelectorAll('.eliminar').forEach(button => {
    
        button.addEventListener("click", e => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);

            guardar(JSON.stringify(eventos));
            
            mostarEventos();
        });
    });
}

 function guardar(datos) {
  localStorage.setItem("lista", datos);
 }

 function cargar() {
   return localStorage.getItem("lista")
 }
