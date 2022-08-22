//quiero tomar el valor en "vivo"

let valorVivo = Number(document.querySelector("#cantKG div input").value);;
let rango = document.querySelector("#cantKG div input");


//Funcion del rango de KG

        //codigo robado que cheque y actualiza el valor en TIEMPO "real"

        let textoPrueba = document.createTextNode("");

        rango.addEventListener("change", function() {
            valorVivo =  Number(document.querySelector("#cantKG div input").value);
            textoPrueba = document.querySelector("#cantKG p").innerText = "Usted eligio " + valorVivo  +"kg, puede seleccionar hasta "+ maxSabores(valorVivo) +" sabores.";

        },false);

///        

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
        alert("usted no selecciono una ciudad");
    } else {
        document.querySelector("#ciudadEntrega").classList.toggle("ocultarSINO");
        document.querySelector("#armadoPedido").classList.toggle("ocultarSINO");

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
    document.querySelector("#collapseOne div .ocultarSINO").classList.toggle("ocultarSINO");

    // COSAS QUE PUEDEN VOLVER A APARECER
    document.querySelector("#collapseOne div label").classList.toggle("ocultarSINO");
    document.querySelector("#cantKG").classList.toggle("ocultarSINO");
    document.querySelector("#collapseOne div div button").classList.toggle("ocultarSINO");
})

//Seccion para controlar la eleccion de sabores

let saboresDisponibles = ['Chocolate','Cho. con almendras','Vainilla','Coco','Fru. del bosque','Banana Split','Granizado','Tiramisú','Cereza','DDL Granizado'];

let variableElecciones = new Array (10); //[0,1,2,3,4,5,6,7,8,9];

let eleccionCliente = document.querySelectorAll("#armadoPedido .saborElegido");

let formSabores = document.querySelector("#armadoPedido .seccionSabor");

let btnConfirmarSabores = document.querySelector("#armadoPedido .seccionSabor button");

for (let i=0;i<variableElecciones.length;i++){
        variableElecciones[i]=false;
    }

// formSabores.addEventListener("change", function() {
//     for (let i=0;i<variableElecciones.length;i++){
//         if(eleccionCliente[i].checked=="true"){
//            variableElecciones[i]=true;
//         } else {
//            variableElecciones[i]=false;
//         }
//     }
// });

btnConfirmarSabores.addEventListener("click" , ()=>{
    let totalElegidos = 0;
    let condicionCompra = false
    for (let i=0;i<variableElecciones.length;i++){
        variableElecciones[i]=eleccionCliente[i].checked;
        if (variableElecciones[i]==true){
            totalElegidos++;
            console.log(totalElegidos)
        }
    }
    
    if (totalElegidos<1){
        alert("debe elegir al menos un sabor")
    } else if (totalElegidos>valorVivo){
        alert("usted no puede elegir más de "+ maxSabores(valorVivo) +" sabores")
    } else {
        condicionCompra=true;
    }

    if (condicionCompra===true){
        
    }


})




//sabores seleccionables OK
//sabores elegidos por el cliente OK
//valor de elegido de la variable 
 
//relacionar al click las dos anteriores
    //puedo detectar cuando se hace click

//array total de esa eleccion



