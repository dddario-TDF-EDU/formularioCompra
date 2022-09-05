//contar pedidos de KG helado
let cantPedidosPorKG = 0;

//quiero tomar el valor en "vivo"

let valorVivo = Number(document.querySelector("#cantKG div input").value);
let rango = document.querySelector("#cantKG div input");


//Funcion del rango de KG

        //codigo robado que chequea y actualiza el valor en TIEMPO "real"

        let textoPrueba = document.createTextNode("");

        rango.addEventListener("change", function() {
            valorVivo =  Number(document.querySelector("#cantKG div input").value);
            textoPrueba = document.querySelector("#cantKG p").innerText = "Usted eligio " + valorVivo  +"kg, puede seleccionar hasta "+ maxSabores(valorVivo) +" sabores.";

        },false);

// Funciones del boton "Armar mi pedido"

let btnIntro=document.querySelector("div .esteticaBoton");


btnIntro.addEventListener('click' ,() => {
    document.querySelector("#ciudadEntrega").classList.toggle("ocultarSINO");
    btnIntro.classList.toggle("ocultarSINO");
})

//Funciones del  boton confirmar ciudad

let btnConfirmar =document.querySelector("#ciudadEntrega button");
let ciudadElegida;
let btnSabores = document.querySelector("#collapseOne div button");

btnConfirmar.addEventListener('click' ,() => {
    let hayCiudad = false;
    ciudadEnvio = document.querySelectorAll("#ciudadEntrega div div input");
     for (let i=0;i<ciudadEnvio.length;i++){
         if (ciudadEnvio[i].checked==true){
             ciudadElegida=ciudadEnvio[i].value;
             hayCiudad = true;
             break;
         } 
     }
    if (hayCiudad===false){
        //cartelAlerta("usted no selecciono una ciudad")
        alert("usted no selecciono una ciudad");
    } else {
        
        desAparecerEleccionCiudad()

        //solucion parcial a la aparicion por defecto de la seccion HELADO POR KG 
        
        document.querySelector("#collapseOne").classList.toggle("show");

        document.querySelector("#armadoPedido h2 span").innerText=(ciudadElegida);
        let KGselect = document.createElement("p");
        textoPrueba = document.createTextNode("Usted eligio 1 kg, puede seleccionar hasta 4 sabores");
        KGselect.appendChild(textoPrueba);
        document.querySelector("#cantKG").appendChild(KGselect);
        KGselect.classList.add("text-center");
    }

         
})

//crear array eleccion sabores segun KG

const cantMaxSabores = [3,4,6,8];

function maxSabores(KG) {

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

//FUNCION btnSabores

btnSabores.addEventListener('click' ,()=> {
    desAparecerSabores();
    desAparecerKG();
})

//Seccion para controlar la eleccion de sabores

let saboresDisponibles = ['Chocolate','Cho. con almendras','Vainilla','Coco','Fru. del bosque','Banana Split','Granizado','Tiramisú','Cereza','DDL Granizado'];

let auxEleccionSabor = new Array (10); //[0,1,2,3,4,5,6,7,8,9];

let eleccionSabor = document.querySelectorAll("#armadoPedido .saborElegido");

let formSabores = document.querySelector("#armadoPedido .seccionSabor");

let btnConfirmarSabores = document.querySelector("#armadoPedido .seccionSabor button");

btnConfirmarSabores.addEventListener("click" , ()=>{
    let totalElegidos = 0;
    let condicionCompra = false;
    let auxPedido = new Array(11);
    iniciarArray(auxPedido);
    iniciarArrayBoolean(auxEleccionSabor);
    for (let i=0;i<auxEleccionSabor.length;i++){
        auxEleccionSabor[i]=eleccionSabor[i].checked;
        if (auxEleccionSabor[i]==true){
            totalElegidos++;
            auxPedido[i]=1;
            console.log(totalElegidos)
        }
    }
    
    if (totalElegidos<1){
        alert("debe elegir al menos un sabor");
    } else if (totalElegidos>maxSabores(valorVivo)){
        alert("usted no puede elegir más de "+ maxSabores(valorVivo) +" sabores");
    } else {
        condicionCompra=true;
        //conteo para las variables necesarias para cargar al arrayPedidosKG
        auxPedido[10]=valorVivo;
        cantPedidosPorKG++;
        //Reestablecer la seccion.
        desAparecerKG();
        desAparecerSabores();
        document.querySelector("#collapseOne").classList.toggle("show");
        alert("Pedido sumado a su carrito.");
    }

    if (condicionCompra===true){
        arrayCarrito[0]=cantPedidosPorKG;
        cargaPedido(auxPedido,cantPedidosPorKG);
        //no estoy seguro si es necesaria esta linea
        iniciarArray(auxPedido);
        unchekForm(eleccionSabor);

    }


})

//BOTON CONFIRMAR POSTRES

let eleccionPostre = document.querySelectorAll("#armadoPedido .postreElegido");

let auxEleccionPostre = new Array (eleccionPostre.length);

let btnConfirmarPostres = document.querySelector("#postreEleccion .seccionPostres button");

btnConfirmarPostres.addEventListener("click" , ()=> {
    let totalElegidos = 0;
    let condicionCompra = false;
    let auxPedido = new Array(eleccionPostre.length);
    iniciarArray(auxPedido);
    iniciarArrayBoolean(auxEleccionPostre);
    for (let i=0;i<auxEleccionPostre.length;i++){
        auxEleccionPostre[i]=eleccionPostre[i].checked;
        if (auxEleccionPostre[i]==true){
            totalElegidos++;
            auxPedido[i]++;
            console.log(totalElegidos);
        }
    }

    if (totalElegidos<1){
        alert("usted no eligio ningun postre");
    }  else {
        condicionCompra=true;
        document.querySelector("#collapseTwo").classList.toggle("show");
        alert("Pedido sumado a su carrito.");
    }

    if (condicionCompra===true){
        for(let i=0;i<eleccionPostre.length;i++){
            arrayCarrito[i+1]=arrayCarrito[i+1]+auxPedido[i];
        }
        unchekForm(eleccionPostre);
    }

})

//BOTON CONFIRMAR EXTRAS

let eleccionExtras = document.querySelectorAll("#armadoPedido .extraElegido");

let auxEleccionExtras = new Array (eleccionExtras.length);

let btnConfirmarExtras = document.querySelector("#extrasEleccion .seccionExtras button");

btnConfirmarExtras.addEventListener("click" , ()=> {
    let totalElegidos = 0;
    let condicionCompra = false;
    let auxPedido = new Array(eleccionExtras.length);
    iniciarArray(auxPedido);
    iniciarArrayBoolean(auxEleccionExtras);
    for (let i=0;i<auxEleccionExtras.length;i++){
        auxEleccionExtras[i]=eleccionExtras[i].checked;
        if (auxEleccionExtras[i]==true){
            totalElegidos++;
            auxPedido[i]++;
            console.log(totalElegidos);
        }
    }

    if (totalElegidos<1){
        alert("usted no eligio ningun extra");
    }  else {
        condicionCompra=true;
        document.querySelector("#collapseThree").classList.toggle("show");
        alert("Pedido sumado a su carrito.");
    }

    if (condicionCompra===true){
        for(let i=0;i<eleccionExtras.length;i++){
            arrayCarrito[i+7]=arrayCarrito[i+7]+auxPedido[i];
        }
        unchekForm(eleccionExtras);
    }

})


///Crear alerta pequeña


// FUNCION DES/APARECER KG seccion

function desAparecerKG() {
    document.querySelector("#collapseOne div label").classList.toggle("ocultarSINO");
    document.querySelector("#cantKG").classList.toggle("ocultarSINO");
    document.querySelector("#collapseOne div div button").classList.toggle("ocultarSINO");
}

// FUNCION DES/APARECER SABORES seccion

function desAparecerSabores() {
    document.querySelector("#collapseOne .seccionSabor").classList.toggle("ocultarSINO");
    

}

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

//FUNCION INICIAR ARRAY 

function iniciarArray(arrayAIniciar){
    for (let i=0;i<arrayAIniciar.length;i++){
        arrayAIniciar[i]= 0;
    }
}

//FUNCION INICIAR ARRAY BOOLEAN

function iniciarArrayBoolean(arrayAIniciar){
    for (let i=0;i<arrayAIniciar.length;i++){
        arrayAIniciar[i]= false;
    }
}

//FUNCION UNCHEK-FORM

function unchekForm(checklistArray){
    for (let i=0;i<checklistArray.length;i++){
        checklistArray[i].checked = false;
    }
}

                                                    //Gestion del carro de compras

//Crear array carrito

let arrayCarrito = new Array (11);
iniciarArray(arrayCarrito);


//array carrito depende de otro array para procesar la carga de helado por KG

let arrayPedidosKG = new Array(10);

    for (let i=0;i<arrayPedidosKG.length;i++){
        arrayPedidosKG[i]= new Array(11);
    }

//declaracion del array de pedidos SATISFACTORIA OKKKKK  

for (let i=0;i<arrayPedidosKG.length;i++){
    for (let j=0;j<arrayPedidosKG[i].length;j++){
        arrayPedidosKG[i][j]=0;
    }
}

//el recorrido del array del indice J tiene que ser al reves (decrementando) para no procesar todo el array si no hay ningun pedido figurando.

function recorriendoPedidos(X){
    let cuentaPedidos = 0;
    let condicionCorte = false;
    //rellenar recorrido, ya tengo las condiciones para pararlo y q no se complete
}


//arrayPrecios utilizara la misma estructura que arrayCarrito, solo que en la primer variable
//el primer elemento es un array que contiene los precios del kg de helado
let arrayPrecios = new Array (11);

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