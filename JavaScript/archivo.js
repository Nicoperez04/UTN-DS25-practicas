/**Resolucion de los ejercicios en este archivo unico */


/**Ejercicio 1 */
function ejercicio1 (){
    let numero = 10;
    numero += 5;
    console.log("Ejercicio 1: ", numero);
}

/**Ejercicio 2 */
function ejercicio2 () {
    let nombre = "Profe";
    let saludo = "¡Hola ";
    let mensaje = saludo + nombre + "!";
    console.log("Ejercicio 2:", mensaje);
}

/**Ejercicio 3 */
function ejercicio3 (){
    let a = 5;
    let b = 8;

    if (a === b) {
    console.log("Son iguales");
    } else if (a > b) {
    console.log("El primero es mayor");
    } else {
    console.log("El segundo es mayor");
    }
}

/**Ejercicio 4 */
function ejercicio4 () {
    let numeroGrupo = 5;

    switch (true) {
    case (numeroGrupo >= 1 && numeroGrupo <= 3):
        console.log("Grupo 1");
        break;
    case (numeroGrupo >= 4 && numeroGrupo <= 6):
        console.log("Grupo 2");
        break;
    case (numeroGrupo >= 7 && numeroGrupo <= 10):
        console.log("Grupo 3");
        break;
    default:
        console.log("Número fuera de rango");
    }
}

/**Ejercicio 5 */
function ejercicio5 (){
    let suma = 0;
    for (let i = 0; i <= 10; i++) {
    suma += i;
    }
    console.log("Sumatoria de 0 a 10 =", suma);
}

/**Ejercicio 6 */
function ejercicio6 (){
    let numeros = [1,2,3,4,5,6,7,8,9,10];
    let producto = 1;
    for (let n of numeros) {
        producto *= n;  
    }
    console.log("Producto total =", producto);
}

/**Ejercicio 7 */
function ejercicio7 (){
    function multiplicar(x, y) {
        return x * y;
    }
    console.log("Funcion multiplicar:", multiplicar(3, 4));
}

/**Ejercicio 8 */
function ejercicio8 (){
    function unirCadenas(cadena1, cadena2) {
        return cadena1 + cadena2;
    }
    console.log("Unir cadenas:", unirCadenas("Hola ", "mundo"));
}

/**Ejercicio 9 */
function ejercicio9 (){
    function comparar(a, b) {
        if (a === b) {
            return "Son iguales";
        } else if (a > b) {
        return "El primero es mayor"
        } else {
            return "El segundo es mayor";
        }
    }
    console.log("Ejercicio 9:", comparar(10, 5));
}

/**Ejercicio 10 */
function ejercicio10 (){
    function mostrarAsteriscos(cantidad) {
        console.log("*".repeat(cantidad));
    }
    mostrarAsteriscos(7);
}

/**Ejercicio 11 */
function ejercicio11 (){
    function calcularMonto(monto, medioPago) {
        let descuento = 0;

        if (monto >= 200 && monto <= 400) {
            if (medioPago === "E") {
                descuento = 0.30;
            } else if (medioPago === "D") {
                descuento = 0.20;
            } else if (medioPago === "C") {
                descuento = 0.10;
            }
        } else if (monto > 400) {
            descuento = 0.40;
        }
        return monto - (monto * descuento);
    }
        console.log("Ejercicio 11:", calcularMonto(350, "E"));
}

/**Ejercicio 12 */
function ejercicio12 () {
     function mostrarArbol(cantidad) {
        let resultado = "";
        for (let i = 1; i <= cantidad; i++) {
            resultado += "*".repeat(i) + "\n";
        }
        console.log(resultado);
    }
    mostrarArbol(7);
}

/**Ejercicio 13 */
function ejercicio13 (){
    function diaSemana(nro) {
        switch(nro) {
            case 1: return "Lunes";
            case 2: return "Martes";
            case 3: return "Miércoles";
            case 4: return "Jueves";
            case 5: return "Viernes";
            case 6: return "Fin de semana"
            case 7: return "Fin de semana";
            default: return "Día inválido";
        }
    }
    console.log("Ejercicio 13:", diaSemana(6));
}

/**Ejercicio 14 */
function ejercicio14 (){
    let cantidad = parseInt(prompt("¿Cuántos números vas a ingresar?"));
    let valores = prompt("Ingresá los números separados por coma (ej: 4,6,8):").split(",");
    let total = 0;

    for (let i = 0; i < cantidad; i++) {
        total += Number(valores[i]);
    }

    let promedio = total / cantidad;
    console.log("Ejercicio 14: Promedio =", promedio);
}

/**Ejercicio 15*/
function ejercicio15 (){
    function crearArbolDesdeUsuario() {
        let altura = parseInt(prompt("Ingresá la altura del árbol"));
        if (isNaN(altura) || altura <= 0) {
            alert("Ingresá un número válido y positivo.");
            return;
        }
        let arbol = "*".repeat(altura);
        console.log("Medio árbol:", arbol);
    }
crearArbolDesdeUsuario();
}