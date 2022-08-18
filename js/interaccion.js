//quiero tomar el valor del rango y asignarlo a una variable

let eleccionKG = document.querySelector("#cantKG div input").value;


//quiero tomar el valor en "vivo"

let valorVivo;
let rango = document.querySelector("#cantKG div input");

//codigo robado

let textoKG = document.querySelector("#cantKG p").innerHTML = "Usted eligio " + eleccionKG  +"kg ";

rango.addEventListener("change", function() {
    valorVivo =  document.querySelector("#cantKG div input").value;
    textoKG = document.querySelector("#cantKG p").innerHTML = "Usted eligio " + valorVivo  +"kg ";

},false);



//quiero asignarle una variable para cambiar el texto del mensaje KG seleccionados




