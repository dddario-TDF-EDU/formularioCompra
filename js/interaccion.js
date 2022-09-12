import {
    iniciarArray,
    iniciarArrayBoolean,
    maxSabores,
    precioKG,
    arrayPrecios,
    mostrarBtnTotal,
    ocultarSINO,
    yaPodesPedir,
    precioTotal,
    calculandoTotal,
    desAparecerSeccionKG,
    desAparecerSeccionSabores,
    desHacerBlock,
    entornoMensajeError, 
    cargaToastError,
    mensajePedido,
    mensajeTotal

} from "./datosYFunciones.js";

// Funciones del boton "Armar mi pedido"

let btnIntro=document.querySelector("div .esteticaBoton");

btnIntro.addEventListener('click' ,() => {
    ocultarSINO(btnIntro);
    ocultarSINO(document.querySelector("#ciudadEntrega"));
})

//Funciones del  boton confirmar ciudad

let btnConfirmar =document.querySelector("#ciudadEntrega button");
export let ciudadElegida;

btnConfirmar.addEventListener('click' ,() => {
    let hayCiudad = false;
    let ciudadEnvio = document.querySelectorAll("#ciudadEntrega div div input");
    for (let i=0;i<ciudadEnvio.length;i++){
        if (ciudadEnvio[i].checked==true){
            ciudadElegida = ciudadEnvio[i].value;
            hayCiudad = true;
            break;
         } 
     }
    if (hayCiudad===false){
        cargaToastError("Usted no selecciono una ciudad");
    } else {
        desAparecerEleccionCiudad();
        //solucion parcial a la aparicion por defecto de la seccion HELADO POR KG 
        yaPodesPedir(); 
    }      
});


//quiero tomar el valor en "vivo" de la eleccion de KG de helado

export let valorVivo = Number(document.querySelector("#cantKG div input").value);
let rango = document.querySelector("#cantKG div input");
//export let textCantEleccion = document.createTextNode("");
export let textCantEleccion = document.createTextNode("Usted eligio 1 kg, puede seleccionar hasta 4 sabores");

//Funcion del rango de KG

//codigo robado que chequea y actualiza el valor en TIEMPO "real"

        

rango.addEventListener("change", function() {
    valorKGActual();
},false);

function valorKGActual(){
    valorVivo =  Number(document.querySelector("#cantKG div input").value);
    textCantEleccion = document.querySelector("#cantKG p").innerText = "Usted eligio " + valorVivo  +"kg, puede seleccionar hasta "+ maxSabores(valorVivo) +" sabores.";
        
}


//FUNCION btnSabores

let btnMostrarSabores = document.querySelector("#collapseOne div button"); //boton "Elegir Sabores"

btnMostrarSabores.addEventListener('click' ,()=> {
    desAparecerSeccionSabores();
    desAparecerSeccionKG();
})

//Seccion para controlar la eleccion de sabores

let auxEleccionSabor = new Array (10); //[0,1,2,3,4,5,6,7,8,9];

let eleccionSabor = document.querySelectorAll("#armadoPedido .saborElegido");

let nombreSabor = document.querySelectorAll("#armadoPedido .seccionSabor label");

let btnConfirmarSabores = document.querySelector("#armadoPedido .seccionSabor button");

let cantPedidosPorKG = 0;

btnConfirmarSabores.addEventListener("click" , ()=>{
    inicializarAuxiliares();
    iniciarArrayBoolean(auxEleccionSabor);
    for (let i=0;i<auxEleccionSabor.length;i++){
        auxEleccionSabor[i]=eleccionSabor[i].checked;
        if (auxEleccionSabor[i]==true){
            totalElegidos++;
            auxPedido[i]=1;
            auxNombres[i]= nombreSabor[i].innerText;
        }
    }
    
    if (totalElegidos<1){
        cargaToastError("Debe elegir al menos un sabor");
    } else if (totalElegidos>maxSabores(valorVivo)){
        cargaToastError("Usted no puede elegir más de "+ maxSabores(valorVivo) +" sabores");        
    } else {
        condicionCompra=true;
        //conteo para las variables necesarias para cargar al arrayPedidosKG
        auxPedido[10]=valorVivo;
        cantPedidosPorKG++;
        //Reestablecer la seccion.
        desAparecerSeccionKG();
        desAparecerSeccionSabores();
        document.querySelector("#collapseOne").classList.toggle("show");
        mensajePedido(valorVivo + " KG de helado:");
    }

    if (condicionCompra===true){
        arrayCarrito[0]=cantPedidosPorKG;
        cargaPedido(auxPedido,cantPedidosPorKG);
        unchekForm(eleccionSabor);
        mostrarBtnTotal();
    }


})

//BOTON CONFIRMAR POSTRES

let eleccionPostre = document.querySelectorAll("#armadoPedido .postreElegido");

export let nombrePostres = document.querySelectorAll("#postreEleccion label");

let auxEleccionPostre = new Array (eleccionPostre.length);

let btnConfirmarPostres = document.querySelector("#postreEleccion .seccionPostres button");

btnConfirmarPostres.addEventListener("click" , ()=> {
    inicializarAuxiliares();    
    iniciarArrayBoolean(auxEleccionPostre);
    for (let i=0;i<auxEleccionPostre.length;i++){
        auxEleccionPostre[i]=eleccionPostre[i].checked;
        if (auxEleccionPostre[i]==true){
            totalElegidos++;
            auxPedido[i]++;
            auxNombres[i]= nombrePostres[i].innerText;
        }
    }

    if (totalElegidos<1){
        cargaToastError("Usted no eligio ningun postre");
    }  else {
        condicionCompra=true;
        document.querySelector("#collapseTwo").classList.toggle("show");
        mensajePedido("Postres añadidos:");
    }

    if (condicionCompra===true){
        for(let i=0;i<eleccionPostre.length;i++){
            arrayCarrito[i+1]=arrayCarrito[i+1]+auxPedido[i];
        }
        unchekForm(eleccionPostre);
        mostrarBtnTotal();
    }
})

//BOTON CONFIRMAR EXTRAS

let eleccionExtras = document.querySelectorAll("#armadoPedido .extraElegido");

export let nombreExtras = document.querySelectorAll("#extrasEleccion label");

let auxEleccionExtras = new Array (eleccionExtras.length);

let btnConfirmarExtras = document.querySelector("#extrasEleccion .seccionExtras button");

btnConfirmarExtras.addEventListener("click" , ()=> {
    inicializarAuxiliares();
    iniciarArrayBoolean(auxEleccionExtras);
    for (let i=0;i<auxEleccionExtras.length;i++){
        auxEleccionExtras[i]=eleccionExtras[i].checked;
        if (auxEleccionExtras[i]==true){
            totalElegidos++;
            auxPedido[i]++;
            auxNombres[i]= nombreExtras[i].innerText;
        }
    }

    if (totalElegidos<1){
        cargaToastError("Usted no eligio ningun extra");
    }  else {
        condicionCompra=true;
        document.querySelector("#collapseThree").classList.toggle("show");
        mensajePedido("Extras añadidos:");
    }

    if (condicionCompra===true){
        for(let i=0;i<eleccionExtras.length;i++){
            arrayCarrito[i+7]=arrayCarrito[i+7]+auxPedido[i];
        }
        unchekForm(eleccionExtras);
        mostrarBtnTotal();
    }
})

//BOTON para regresar del cartelError

let btnCloseError = document.querySelector("#alertToast button");

btnCloseError.addEventListener("click" , ()=>{
    desHacerBlock();
})

//BOTON PARA CALCULAR TOTAL

let btnTotal= document.querySelector("#botonFin button");

btnTotal.addEventListener("click" , ()=>{
    calculandoTotal();
})

//BOTON CERRAR TOTAL

let btnCerrarTotal= document.querySelector(".cardTotal button");

btnCerrarTotal.addEventListener("click" ,()=>{
    document.querySelector(".cardTotal").classList.toggle("ocultarSINO");
    desHacerBlock();
})

// FUNCION DES/APARECER CIUDAD seccion

function desAparecerEleccionCiudad() {
    document.querySelector("#ciudadEntrega").classList.toggle("ocultarSINO");
    document.querySelector("#armadoPedido").classList.toggle("ocultarSINO");
}

// FUNCION CARGA PEDIDO

function cargaPedido(arrayAux,numPedido) {
    for (let i=0;i<arrayAux.length;i++){
        arrayPedidosKG[Number(numPedido)-1][i]=arrayAux[i];
    }
}

//FUNCION UNCHEK-FORM

function unchekForm(checklistArray){
    for (let i=0;i<checklistArray.length;i++){
        checklistArray[i].checked = false;
    }
}

//INICIALIZACION TEMPORALES

let totalElegidos = 0;
let condicionCompra = false;
let auxPedido = new Array(11);
export let auxNombres = new Array(11);

function inicializarAuxiliares(){
    totalElegidos = 0;
    condicionCompra = false;
    iniciarArray(auxNombres);
    iniciarArray(auxPedido);
}

                                                    //Gestion del carro de compras



//Crear array carrito

export let arrayCarrito = new Array (11);

iniciarArray(arrayCarrito);

//array carrito depende de otro array para procesar la carga de helado por KG

export let arrayPedidosKG = new Array(10);

    for (let i=0;i<arrayPedidosKG.length;i++){
        arrayPedidosKG[i]= new Array(11);
    }

//declaracion del array de pedidos SATISFACTORIA OKKKKK  

for (let i=0;i<arrayPedidosKG.length;i++){
    for (let j=0;j<arrayPedidosKG[i].length;j++){
        arrayPedidosKG[i][j]=0;
    }
}