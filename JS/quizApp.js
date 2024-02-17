const iniciar_btn = document.querySelector(".iniciar button");
const reglas = document.querySelector(".reglas");

iniciar_btn.onclick = () =>
{
    reglas.classList.add("reglasActivado");
}

const salir_reglas = reglas.querySelector(".botones_reglas .salir");

salir_reglas.onclick = () =>
{
    reglas.classList.remove("reglasActivado");
}

const continuar_btn = reglas.querySelector(".botones_reglas .continuar");
const quiz = document.querySelector(".quiz");

continuar_btn.onclick = () =>
{
    reglas.classList.remove("reglasActivado");
    quiz.classList.add("QuizActivado");
    mostrar_preguntas(0);
    contador_preg(1);
    iniciar_tiempo(15);
}

const contador_tiempo = quiz.querySelector(".tiempo .tiempo_seg");
const tiempo_terminado = quiz.querySelector(".header .tiempo_rest");

const lista_opciones = document.querySelector(".opciones");

let contador_preguntas = 0;
let contador_num = 1;
let contador;
let valor_tiempo = 15;
let userScore = 0;



const siguiente_btn = quiz.querySelector(".siguiente");
const resultados = document.querySelector(".resultado");
const salir_quiz = resultados.querySelector(".botones_resulta .salir");


salir_quiz.onclick = () =>
{
    window.location.reload();
}

siguiente_btn.onclick = () =>
{
    if(contador_preguntas < preguntas.length - 1)
    {
        contador_preguntas++;
        contador_num ++;

        mostrar_preguntas(contador_preguntas);
        contador_preg(contador_num);
        clearInterval(contador);
        iniciar_tiempo(valor_tiempo);

        siguiente_btn.style.display = "none";
        tiempo_terminado.textContent = "Tiempo";
    } else
    {
        clearInterval(contador);
        console.log("quiestionario completado");
        mostrar_resultado();
    }
}

function mostrar_preguntas(index)
{
    const pregunta_texto = document.querySelector(".pregunta");

    let pregunta_tag = '<h3>'+ preguntas[index].num + ". " + preguntas[index].pregunta + '</h3>';

    let opciones_tag = '<div class="opcion">'+ preguntas[index].opcion[ 0 ] + '<p></p></div> ' + 
                       '<div class="opcion">'+ preguntas[index].opcion[ 1 ] + '<p></p></div> ' + 
                       '<div class="opcion">'+ preguntas[index].opcion[ 2 ] + '<p></p></div> ' + 
                       '<div class="opcion">'+ preguntas[index].opcion[ 3 ] + '<p></p></div> ' ;

    pregunta_texto.innerHTML = pregunta_tag;
    lista_opciones.innerHTML = opciones_tag;

    const option = lista_opciones.querySelectorAll(".opcion");
    for(let i = 0; i < option.length; i++)
    {
        option[i].setAttribute("onclick", "seleccion(this)");
    }
}

let tickIcon = '<div><i class="fa-solid fa-check"></i></div>';
let crocIcon = '<div><i class="fa-solid fa-xmark"></i></div>';

function seleccion(respuesta)
{
    clearInterval(contador);
    let userRespuesta = respuesta.textContent;
    let respuesta_correcta = preguntas[contador_preguntas].respuesta;
    let todas = lista_opciones.children.length;

    if(userRespuesta == respuesta_correcta )
    {
        userScore += 1;
        console.log(userScore);
        respuesta.classList.add("correcto");
        console.log("La respuesta es correcta");
        respuesta.insertAdjacentHTML("beforeend", tickIcon );
    } else
    {
        respuesta.classList.add("incorrecto");
        console.log("La respuesta es incorrecta");
        respuesta.insertAdjacentHTML("beforeend", crocIcon );

        for(let i = 0; i < todas; i++)
        {
            if(lista_opciones.children[i].textContent == respuesta_correcta)
            {
                lista_opciones.children[i].setAttribute("class", "opcion correcta");
                lista_opciones.children[i].insertAdjacentHTML("beforeend", tickIcon );
            }
        }
        
    }

    for (let i = 0; i < todas; i++) 
    {
        lista_opciones.children[i].classList.add("disabled");
    }

    siguiente_btn.style.display = "block";
}

function mostrar_resultado()
{
    reglas.classList.remove("reglasActivado");
    quiz.classList.remove("QuizActivado");
    resultados.classList.add("resultadoActivado");

    const score = resultados.querySelector(".score_texto");

    if(userScore > 3)
    {
        
        let scoreTag = '<p> Felicidades!!! Has acertado <span><b>' + userScore + '</b></span> preguntas de <span><b>' + preguntas.length + '</b></span></p>';
        score.innerHTML = scoreTag;
    }
    else if(userScore > 1)
    {
        let scoreTag = '<p> Muy bien, has acertado <span><b>' + userScore + '</b></span> preguntas de <span><b>' + preguntas.length + '</b></span></p>';
        score.innerHTML = scoreTag;
    }
    else
    {
        let scoreTag = '<p> Lo siento, solo has acertado <span><b>' + userScore + '</b></span> preguntas de <span><b>' + preguntas.length + '</b></span></p>';
        score.innerHTML = scoreTag;
    }
}

function iniciar_tiempo(time)
{
    contador = setInterval(tiempo, 1000);

    function tiempo()
    {
        contador_tiempo.textContent = time;
        time--;

        if(time < 9)
        {
            let addZero = contador_tiempo.textContent;
            contador_tiempo.textContent = "0" + addZero;
        }

        if(time < 0)
        {
            clearInterval(contador);
            contador_tiempo.textContent = "00";
            tiempo_terminado.textContent = "El Tiempo Acabo";

            let respuesta_correcta = preguntas[contador_preguntas].respuesta;
            let todas = lista_opciones.children.length;

            for(let i = 0; i < todas; i++)
          {
            if(lista_opciones.children[i].textContent == respuesta_correcta)
            {
                lista_opciones.children[i].setAttribute("class", "opcion correcta");
                lista_opciones.children[i].insertAdjacentHTML("beforeend", tickIcon );
            }
          }

          for (let i = 0; i < todas; i++) 
          {
            lista_opciones.children[i].classList.add("disabled");
          }
      
          siguiente_btn.style.display = "block";

        }
    }

}

function contador_preg(index)
{
    const bottom = quiz.querySelector(".total");
    let totalTag = '<p>' + index + '<b>/</b>' + preguntas.length + '</p>';
    bottom.innerHTML = totalTag;
}