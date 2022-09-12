import {
    ciudadElegida,
    textCantEleccion,
    auxNombres,
    arrayCarrito,
    nombrePostres,
    nombreExtras,
    arrayPedidosKG

} from "./interaccion.js";

//arrayPrecios utilizara la misma estructura que arrayCarrito, solo que en la primer variable
//el primer elemento es un array que contiene los precios del kg de helado
export let arrayPrecios = new Array (11);

arrayPrecios[0] = new Array (4);

//declaracion de precios
arrayPrecios[0][0]=600;
arrayPrecios[0][1]=1200;
arrayPrecios[0][2]=1800;
arrayPrecios[0][3]=2200;
arrayPrecios[1]= 1500;
arrayPrecios[2]= 1000;
arrayPrecios[3]= 2000;
arrayPrecios[4]= 1500;
arrayPrecios[5]= 1500;
arrayPrecios[6]= 1500;
arrayPrecios[7]= 200;
arrayPrecios[8]= 100;
arrayPrecios[9]= 200;
arrayPrecios[10]= 200;

//FUNCION PRECIO KG

export function precioKG(KG){
    switch (KG) {
        case 0.5:
            return precioTotal=precioTotal+arrayPrecios[0][0];
        case 1:
            return precioTotal=precioTotal+arrayPrecios[0][1];
        case 1.5:
            return precioTotal=precioTotal+arrayPrecios[0][2];
        case 2:
            return precioTotal=precioTotal+arrayPrecios[0][3];
        default:
            console.log("no deberia llegar a este punto");
            break;
    }
}

//FUNCION CALCULAR TOTAL  LAMENTABLEMENTE MEZCLA LA FUNCION CALCULAR CON LA FUNCION QUE MUESTRA EL MSJ TOTAL :/

export let precioTotal = 0;

export function calculandoTotal(){
    let arrayMsj = new Array(11);
    let KGtotal = 0;
    let listaFactura = new Array(11);
    iniciarArrayBoolean(listaFactura);
    copiarNombres(arrayMsj);
    precioTotal=0;

    if(arrayCarrito[0]>0){
        for(let i=0;i<arrayCarrito[0];i++){
            if(arrayPedidosKG[i][10]>0){
                let aux= Number(arrayPedidosKG[i][10]);
                KGtotal=+ aux;
                precioTotal=precioTotal+precioKG(aux);
                listaFactura[0]=true;
            }
        }
        arrayMsj[0]= arrayMsj[0] + KGtotal + " kilos " + precioTotal;
    }
    
    for(let i=1;i<arrayCarrito.length;i++){
        if(arrayCarrito[i]>0){
            let aux=arrayCarrito[i];
            precioTotal= precioTotal+(aux*arrayPrecios[i]);
            arrayMsj[i]= arrayMsj[i] + "X" + aux + " unidad/es " + aux*arrayPrecios[i];
            listaFactura[i]=true;
        }
    }
    mensajeTotal(arrayMsj,listaFactura);
}

//crear array eleccion sabores segun KG

const cantMaxSabores = [3,4,6,8];

export function maxSabores(KG) {

        switch (KG) {
            case 0.5:
                return cantMaxSabores[0];
            case 1:
                return cantMaxSabores[1];
            case 1.5:
                return cantMaxSabores[2];
            case 2:
                return cantMaxSabores[3];
            default:
                console.log("no deberia llegar a este punto");
                break;
        }
}

//FUNCION INICIAR ARRAY 

export function iniciarArray(arrayAIniciar){
    for (let i=0;i<arrayAIniciar.length;i++){
        arrayAIniciar[i]= 0;
    }
}

//FUNCION INICIAR ARRAY BOOLEAN

export function iniciarArrayBoolean(arrayAIniciar){
    for (let i=0;i<arrayAIniciar.length;i++){
        arrayAIniciar[i]= false;
    }
}

//FUNCION OCULTAR PARA EL PASO ENTRE ELECCIONES

export function ocultarSINO(objeto){
    objeto.classList.toggle("ocultarSINO");
}

// BOTON CALCULAR TOTAL

export function mostrarBtnTotal(){
    document.querySelector("#botonFin").classList.remove("ocultarSINO");
}

//FUNCIONES DE CARTEL ERROR

export function desHacerBlock(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("noClick");
    document.querySelector("#ciudadEntrega").classList.toggle("noClick");
    document.querySelector("#armadoPedido").classList.toggle("noClick");
    document.querySelector("#botonFin").classList.toggle("noClick");
    
}

export function entornoMensajeError(){
    desHacerBlock();
}

//FUNCION QUE ACOMODA Y MUESTRA LA SECCION DE ARMADO DE PEDIDO.

export function yaPodesPedir(){
    document.querySelector("#collapseOne").classList.toggle("show");
    document.querySelector("#armadoPedido h2 span").innerText=(ciudadElegida);
    let KGselect = document.createElement("p");
    KGselect.appendChild(textCantEleccion);
    document.querySelector("#cantKG").appendChild(KGselect);
    KGselect.classList.add("text-center"); 
}

// FUNCION DES/APARECER KG seccion

export function desAparecerSeccionKG() {
    document.querySelector("#collapseOne div label").classList.toggle("ocultarSINO");
    document.querySelector("#cantKG").classList.toggle("ocultarSINO");
    document.querySelector("#collapseOne div div button").classList.toggle("ocultarSINO");
}

// FUNCION DES/APARECER SABORES seccion

export function desAparecerSeccionSabores() {
    document.querySelector("#collapseOne .seccionSabor").classList.toggle("ocultarSINO");
}

//FUNCION CARGAR MENSAJE CARTEL ERROR

export function cargaToastError(mensaje){
    let errorToast = document.querySelector("#alertToast");
    errorToast.classList.toggle("show");
    let zonaMensaje = errorToast.lastElementChild;
    evitarMensajeMultiple(zonaMensaje);
    let p = document.createElement("p");
    p.innerText = mensaje;
    zonaMensaje.appendChild(p);
    entornoMensajeError();
}

function evitarMensajeMultiple(errorABorrar){
    while (errorABorrar.firstChild) {
        errorABorrar.removeChild(errorABorrar.firstChild);
      }
}

//FUNCION CARGAR MENSAJE PEDIDO REALIZADO
export function mensajePedido(tituloEleccion){
    let toastPedido = document.querySelector("#liveToast");
    toastPedido.classList.toggle("show");
    let textoToast = toastPedido.lastElementChild;
    evitarMensajeMultiple(textoToast);
    let titulo = document.createElement("p");
    titulo.innerText = tituloEleccion;
    textoToast.appendChild(titulo);
    for(let i=0;i<auxNombres.length;i++){
        if(auxNombres[i]!=0){
        let p = document.createElement("p");
        p.innerText=auxNombres[i];
        textoToast.appendChild(p);
        }
    }
}

//FUNCION MENSAJE TOTAL DESCRIPTIVO

export function mensajeTotal(lista,decisionMostrar){
    let ulFactura = document.querySelector(".cardTotal ul");
    evitarMensajeMultiple(ulFactura);
    for(let i=0;i<decisionMostrar.length;i++){
        if(decisionMostrar[i]===true){
            let p = document.createElement("p");
            p.innerText = lista[i];
            ulFactura.appendChild(p);
        }
    }
    let totalFactura = document.querySelector(".cardTotal span");
    totalFactura.innerText = precioTotal;
    document.querySelector(".cardTotal").classList.toggle("ocultarSINO");
    entornoMensajeError();
}

function copiarNombres(arrayNombres){
    listarNombres();
    for(let i=0;i<arrayNombres.length;i++){
      arrayNombres[i]=todosLosNombres[i];  
    }
}

let todosLosNombres = new Array(11);
function listarNombres(){
    todosLosNombres[0] = "Helado por KG, cantidad ";
    for(let i=0;i<nombrePostres.length;i++){
        todosLosNombres[i+1]=nombrePostres[i].innerText;
    }
    for(let i=0;i<nombreExtras.length;i++){
        todosLosNombres[i+7]=nombreExtras[i].innerText;
    }
}