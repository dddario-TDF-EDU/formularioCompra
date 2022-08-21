//quiero tomar el valor del rango y asignarlo a una variable

let eleccionKG = document.querySelector("#cantKG div input").value;

//quiero tomar el valor en "vivo"

let valorVivo;
let rango = document.querySelector("#cantKG div input");

//codigo robado

let textoPrueba = document.createTextNode("");

rango.addEventListener("change", function() {
    valorVivo =  document.querySelector("#cantKG div input").value;
    textoPrueba = document.querySelector("#cantKG p").innerHTML = "Usted eligio " + valorVivo  +"kg, puede seleccionar hasta "+ maxSabores(valorVivo) +" sabores.";

},false);

// asignar funcion click botones y desaparecer

let btnIntro=document.querySelector("div .esteticaBoton");


btnIntro.addEventListener('click' ,() => {
    document.querySelector("#ciudadEntrega").classList.toggle("ocultarSINO");
    btnIntro.classList.toggle("ocultarSINO");
})

//funciones del  boton confirmar ciudad

let btnConfirmar=document.querySelector("#ciudadEntrega button");
let ciudadElegida;

btnConfirmar.addEventListener('click' ,() => {
    ciudadEnvio = document.querySelectorAll("#ciudadEntrega div div input");
     for (let i=0;i<ciudadEnvio.length;i++){
         if (ciudadEnvio[i].checked==true){
             ciudadElegida=ciudadEnvio[i].value;
             break;
         } 
     }
    if (ciudadElegida==0){
        alert("usted no selecciono una ciudad");
    } else {
        document.querySelector("#ciudadEntrega").classList.toggle("ocultarSINO");
        document.querySelector("#armadoPedido").classList.toggle("ocultarSINO");
        document.querySelector("#armadoPedido h2 span").innerText=(ciudadElegida);
        let KGselect = document.createElement("p");
        //NOSE COMO ARREGLAR ESTO SIN EMPEZAR DESDE UN VALOR DEFAULT
        textoPrueba = document.createTextNode("Usted eligio 1 kg, puede seleccionar hasta 4 sabores");
        KGselect.appendChild(textoPrueba);
        document.querySelector("#cantKG").appendChild(KGselect);
        KGselect.classList.add("text-center");
    }

         
})

//crear array eleccion sabores segun KG

const cantMaxSabores = [3,4,6,8];

function maxSabores(KG) {

        switch (Number(KG)) {
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

//
