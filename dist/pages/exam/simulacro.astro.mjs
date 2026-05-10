/* empty css                                              */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C2VJd64I.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Db16ldKD.mjs';
import { useSSRContext, defineComponent, ref, computed, onUnmounted, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExamMode",
  props: {
    questions: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const examStarted = ref(false);
    const showResults = ref(false);
    const currentIndex = ref(0);
    const answers = ref(new Array(props.questions.length).fill(void 0));
    const score = ref(0);
    const timeLeft = ref(60 * 60);
    let timerInterval = null;
    const currentQuestion = computed(() => props.questions[currentIndex.value]);
    const passed = computed(() => score.value / props.questions.length >= 0.7);
    function startExam() {
      examStarted.value = true;
      startTimer();
    }
    function startTimer() {
      timerInterval = window.setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
          finishExam();
        }
      }, 1e3);
    }
    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    function selectAnswer(idx) {
      answers.value[currentIndex.value] = idx;
    }
    function prevQuestion() {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    }
    function nextOrFinish() {
      if (currentIndex.value < props.questions.length - 1) {
        currentIndex.value++;
      } else {
        finishExam();
      }
    }
    function finishExam() {
      stopTimer();
      score.value = answers.value.filter((a, q) => a === props.questions[answers.value.indexOf(a)].correct).length;
      showResults.value = true;
      const examHistory = JSON.parse(localStorage.getItem("ai900-exam-history") || "[]");
      examHistory.push({
        date: (/* @__PURE__ */ new Date()).toISOString(),
        score: score.value,
        total: props.questions.length,
        passed: passed.value
      });
      localStorage.setItem("ai900-exam-history", JSON.stringify(examHistory));
    }
    function restartExam() {
      examStarted.value = false;
      showResults.value = false;
      currentIndex.value = 0;
      answers.value = new Array(props.questions.length).fill(void 0);
      score.value = 0;
      timeLeft.value = 60 * 60;
    }
    onUnmounted(() => {
      stopTimer();
    });
    const __returned__ = { props, examStarted, showResults, currentIndex, answers, score, timeLeft, get timerInterval() {
      return timerInterval;
    }, set timerInterval(v) {
      timerInterval = v;
    }, currentQuestion, passed, startExam, startTimer, stopTimer, formatTime, selectAnswer, prevQuestion, nextOrFinish, finishExam, restartExam };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-container" }, _attrs))}>`);
  if (!$setup.examStarted) {
    _push(`<div class="text-center py-12"><div class="text-6xl mb-6">📝</div><h2 class="text-2xl font-bold mb-4">Simulacro de Examen AI-900</h2><p class="text-lg text-[var(--color-text-secondary)] mb-6 max-w-xl mx-auto"> Este simulacro contiene 40 preguntas que cubren todos los dominios del examen. Dispones de 60 minutos para completarlo. </p><div class="bg-[var(--color-bg-secondary)] p-6 rounded-lg mb-6 max-w-md mx-auto"><ul class="text-left space-y-2"><li>📋 <strong>40 preguntas</strong></li><li>⏱️ <strong>60 minutos</strong></li><li>📊 <strong>70%</strong> para aprobar</li><li>💾 <strong>Guardado automático</strong></li></ul></div><button class="btn-primary text-lg px-8 py-4"> Iniciar Examen </button></div>`);
  } else if (!$setup.showResults) {
    _push(`<div class="space-y-6"><div class="flex items-center justify-between bg-[var(--color-bg-secondary)] p-4 rounded-lg"><div class="flex items-center gap-4"><span class="text-sm text-[var(--color-text-secondary)]"> Pregunta ${ssrInterpolate($setup.currentIndex + 1)} de ${ssrInterpolate($props.questions.length)}</span><div class="flex gap-2 flex-wrap"><!--[-->`);
    ssrRenderList($props.questions, (q, idx) => {
      _push(`<span class="${ssrRenderClass([$setup.answers[idx] !== void 0 ? "bg-primary text-white" : "bg-gray-300 dark:bg-gray-700", "w-6 h-6 rounded flex items-center justify-center text-xs"])}">${ssrInterpolate(idx + 1)}</span>`);
    });
    _push(`<!--]--></div></div><div class="${ssrRenderClass([$setup.timeLeft < 300 ? "text-red-500" : "", "text-xl font-mono"])}">${ssrInterpolate($setup.formatTime($setup.timeLeft))}</div></div><div class="bg-[var(--color-bg-secondary)] p-6 rounded-lg"><p class="text-lg font-medium">${ssrInterpolate($setup.currentQuestion.text)}</p></div><div class="space-y-3"><!--[-->`);
    ssrRenderList($setup.currentQuestion.options, (option, idx) => {
      _push(`<button class="${ssrRenderClass([
        "quiz-option",
        $setup.answers[$setup.currentIndex] === idx ? "selected" : ""
      ])}"><span class="font-medium mr-2">${ssrInterpolate(String.fromCharCode(65 + idx))}.</span> ${ssrInterpolate(option)}</button>`);
    });
    _push(`<!--]--></div><div class="flex justify-between"><button${ssrIncludeBooleanAttr($setup.currentIndex === 0) ? " disabled" : ""} class="btn-secondary"> Anterior </button><button class="btn-primary">${ssrInterpolate($setup.currentIndex < $props.questions.length - 1 ? "Siguiente" : "Finalizar Examen")}</button></div></div>`);
  } else {
    _push(`<div class="text-center py-8 max-w-2xl mx-auto"><div class="text-6xl mb-4">${ssrInterpolate($setup.passed ? "🎉" : "📚")}</div><h3 class="text-2xl font-bold mb-4">Resultados del Examen</h3><div class="grid grid-cols-2 gap-4 mb-6"><div class="bg-[var(--color-bg-secondary)] p-4 rounded-lg"><p class="text-sm text-[var(--color-text-secondary)]">Puntuación</p><p class="text-2xl font-bold">${ssrInterpolate($setup.score)}/${ssrInterpolate($props.questions.length)}</p></div><div class="bg-[var(--color-bg-secondary)] p-4 rounded-lg"><p class="text-sm text-[var(--color-text-secondary)]">Porcentaje</p><p class="${ssrRenderClass([$setup.passed ? "text-green-500" : "text-red-500", "text-2xl font-bold"])}">${ssrInterpolate(Math.round($setup.score / $props.questions.length * 100))}% </p></div></div><p class="text-lg mb-6">${ssrInterpolate($setup.passed ? "¡Felicidades! Has aprobado el simulacro." : "No has alcanzado la puntuación mínima. Repasa los temas y vuelve a intentarlo.")}</p><div class="space-y-3"><button class="btn-primary w-full">Realizar Otro Intento</button><a href="/" class="btn-secondary w-full inline-block">Volver al Inicio</a></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ExamMode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExamMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Simulacro = createComponent(($$result, $$props, $$slots) => {
  const questions = [
    { text: "Una empresa de retail quiere predecir las ventas del pr\xF3ximo mes bas\xE1ndose en datos hist\xF3ricos. \xBFQu\xE9 carga de trabajo de IA es la m\xE1s apropiada?", options: ["Anomaly Detection", "Computer Vision", "Prediction/Forecasting", "NLP"], correct: 2 },
    { text: "Un banco necesita identificar transacciones fraudulentas, las cuales representan menos del 0.1% de todas las transacciones. \xBFQu\xE9 carga de trabajo es m\xE1s adecuada?", options: ["Prediction", "Computer Vision", "NLP", "Anomaly Detection"], correct: 3 },
    { text: "Una empresa quiere analisar los comentarios de clientes en Twitter para saber si son positivos o negativos. \xBFQu\xE9 carga de trabajo necesitan?", options: ["Computer Vision", "NLP - Sentiment Analysis", "Conversational AI", "Anomaly Detection"], correct: 1 },
    { text: "Para extraer texto de facturas escaneadas, \xBFqu\xE9 capacidad de Computer Vision se utiliza?", options: ["Image Classification", "Object Detection", "OCR", "Face Detection"], correct: 2 },
    { text: "Un hotel necesita un sistema de atenci\xF3n al cliente que responda preguntas frecuentes autom\xE1ticamente. \xBFQu\xE9 carga de trabajo necesitan?", options: ["NLP", "Computer Vision", "Conversational AI", "Prediction"], correct: 2 },
    { text: "Una empresa quiere detectar defectos visuales en productos en una l\xEDnea de producci\xF3n. \xBFQu\xE9 carga de trabajo es m\xE1s apropiada?", options: ["Prediction", "Computer Vision", "NLP", "Conversational AI"], correct: 1 },
    { text: "Para identificar grupos de clientes similares sin saber de antemano cu\xE1ntos grupos existen, \xBFqu\xE9 tipo de tarea de ML se utiliza?", options: ["Clasificaci\xF3n", "Regresi\xF3n", "Clustering", "Forecasting"], correct: 2 },
    { text: "Una empresa quiere analisar llamadas de clientes para detectar insatisfacci\xF3n. \xBFQu\xE9 combinaci\xF3n de servicios es m\xE1s apropiada?", options: ["Computer Vision + Translator", "Speech-to-Text + Sentiment Analysis", "OCR + Entity Recognition", "Custom Vision + QnA Maker"], correct: 1 },
    { text: "Para un sistema de recomendaci\xF3n de productos basado en comportamiento de compra, \xBFqu\xE9 tipo de aprendizaje se utiliza?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning"], correct: 1 },
    { text: "Una empresa necesita detectar cuando una m\xE1quina industrial est\xE1 funcionando de manera anormal. \xBFQu\xE9 carga de trabajo es m\xE1s adecuada?", options: ["Prediction", "Computer Vision", "Anomaly Detection", "NLP"], correct: 2 },
    { text: "Un sistema de aprobaci\xF3n de cr\xE9ditos discrimina negativamente a personas de ciertas regiones geogr\xE1ficas. \xBFQu\xE9 principio de IA Responsable se viola?", options: ["Transparency", "Fairness", "Privacy", "Reliability"], correct: 1 },
    { text: "Una app no informa a los usuarios que est\xE1n interactuando con un sistema de IA. \xBFQu\xE9 principio se viola?", options: ["Privacy", "Inclusiveness", "Transparency", "Accountability"], correct: 2 },
    { text: "Para cumplir con el principio de Privacy, \xBFcu\xE1l pr\xE1ctica es m\xE1s importante?", options: ["Usar modelos m\xE1s precisos", "Minimizar datos recopilados y obtener consentimiento", "Incluir m\xFAltiples idiomas", "Documentar todas las decisiones t\xE9cnicas"], correct: 1 },
    { text: "Una empresa implementa un sistema de IA sin establecer qui\xE9n es responsable de las decisiones del sistema. \xBFQu\xE9 principio se viola?", options: ["Fairness", "Inclusiveness", "Privacy", "Accountability"], correct: 3 },
    { text: "Para hacer un sistema m\xE1s inclusivo, \xBFcu\xE1l acci\xF3n es m\xE1s efectiva?", options: ["Usar los datos m\xE1s precisos posibles", "Documentar todas las decisiones", "Dise\xF1ar considerando diferentes capacidades y contextos", "Hacer el modelo m\xE1s complejo"], correct: 2 },
    { text: "Un modelo de reconocimiento facial tiene menor precisi\xF3n para personas de ciertos grupos \xE9tnicos. \xBFQu\xE9 principio se viola?", options: ["Transparency", "Fairness", "Privacy", "Reliability"], correct: 1 },
    { text: "Una empresa usa datos de usuarios para entrenar modelos sin su consentimiento. \xBFQu\xE9 principio se viola?", options: ["Fairness", "Privacy", "Inclusiveness", "Reliability"], correct: 1 },
    { text: "Para cumplir con Reliability, \xBFcu\xE1l pr\xE1ctica es m\xE1s importante?", options: ["Usar los datos m\xE1s diversos posibles", "Probar exhaustivamente y monitorear en producci\xF3n", "Incluir m\xFAltiples idiomas", "Explicar todas las decisiones"], correct: 1 },
    { text: "Un sistema de IA toma decisiones que afectan a las personas pero no puede explicar por qu\xE9 tom\xF3 esas decisiones. \xBFQu\xE9 principio se viola?", options: ["Fairness", "Privacy", "Transparency", "Inclusiveness"], correct: 2 },
    { text: "Para implementar Accountability, \xBFcu\xE1l de las siguientes pr\xE1cticas es m\xE1s importante?", options: ["Usar los datos m\xE1s precisos disponibles", "Documentar decisiones y tener roles definidos", "Hacer el modelo lo m\xE1s preciso posible", "Incluir m\xFAltiples idiomas en la aplicaci\xF3n"], correct: 1 },
    { text: "Tienes datos de emails marcados como 'spam' o 'no spam' y quieres entrenar un modelo para clasificarlos. \xBFQu\xE9 tipo de aprendizaje usas?", options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Semi-supervised Learning"], correct: 1 },
    { text: "Un modelo tiene 99% de accuracy en datos de entrenamiento pero solo 60% en datos de test. \xBFQu\xE9 est\xE1 ocurriendo?", options: ["Underfitting", "Good fit", "Overfitting", "No hay problema"], correct: 2 },
    { text: "Quieres predecir el precio de una casa basado en metros cuadrados, n\xFAmero de habitaciones y ubicaci\xF3n. \xBFCu\xE1l es el 'label' en este ejemplo?", options: ["Metros cuadrados", "N\xFAmero de habitaciones", "Ubicaci\xF3n", "Precio de la casa"], correct: 3 },
    { text: "En Azure ML, \xBFcu\xE1l opci\xF3n permite crear modelos sin escribir c\xF3digo?", options: ["Azure ML con notebooks", "Azure ML Designer", "Azure CLI", "SDK de Python"], correct: 1 },
    { text: "AutoML autom\xE1ticamente realiza todas las siguientes tareas EXCEPTO:", options: ["Selecci\xF3n de algoritmo", "Feature engineering", "Definici\xF3n del problema de negocio", "Selecci\xF3n de hiperpar\xE1metros"], correct: 2 },
    { text: "En Azure ML, \xBFd\xF3nde se almacenan todos los recursos (datasets, modelos, experimentos)?", options: ["Azure Storage", "Azure ML Workspace", "Azure Databricks", "Azure Functions"], correct: 1 },
    { text: "Para predecir valores continuos (como temperatura, precio), \xBFqu\xE9 tipo de tarea de ML se utiliza?", options: ["Clasificaci\xF3n", "Clustering", "Regresi\xF3n", "Detecci\xF3n de anomal\xEDas"], correct: 2 },
    { text: "Un modelo de ML es demasiado simple y no captura los patrones en los datos. \xBFC\xF3mo se llama este problema?", options: ["Overfitting", "Underfitting", "Data leakage", "Good fit"], correct: 1 },
    { text: "\xBFCu\xE1l de las siguientes es una t\xE9cnica para evitar overfitting?", options: ["Usar un modelo m\xE1s complejo", "Disminuir la cantidad de datos de entrenamiento", "Cross-validation", "Eliminar features importantes"], correct: 2 },
    { text: "En el pipeline de ML, \xBFcu\xE1l es el paso donde se eligen las variables relevantes para el modelo?", options: ["Recolecci\xF3n de datos", "Preprocesamiento", "Selecci\xF3n de features", "Despliegue"], correct: 2 },
    { text: "Para crear un modelo que clasifique tipos de defectos espec\xEDficos en productos manufactureados, \xBFqu\xE9 servicio usar\xEDas?", options: ["Azure AI Vision", "Azure Face", "Azure Custom Vision", "Azure Form Recognizer"], correct: 2 },
    { text: "Para extraer texto estructurado de facturas (pares clave-valor), \xBFqu\xE9 servicio de Azure es m\xE1s apropiado?", options: ["Azure AI Vision", "Custom Vision", "Face", "Form Recognizer"], correct: 3 },
    { text: "Azure AI Vision proporciona capacidades generales preentrenadas. \xBFCu\xE1l es su principal limitaci\xF3n?", options: ["No puede hacer OCR", "No puede adaptarse a dominios espec\xEDficos", "No puede detectar objetos", "Solo funciona con rostros"], correct: 1 },
    { text: "Para verificar la identidad de un usuario mediante reconocimiento facial en una app bancaria, \xBFqu\xE9 servicio usar\xEDas?", options: ["Azure AI Vision", "Custom Vision", "Form Recognizer", "Azure Face"], correct: 3 },
    { text: "\xBFCu\xE1l es la diferencia entre Image Classification y Object Detection?", options: ["Classification es m\xE1s r\xE1pido", "Classification clasifica toda la imagen; Detection encuentra ubicaci\xF3n de objetos", "Detection solo funciona con fotos", "No hay diferencia"], correct: 1 },
    { text: "Para analisar el sentimiento (positivo/negativo) de rese\xF1as de productos, \xBFqu\xE9 servicio de Azure usar\xEDas?", options: ["Translator", "QnA Maker", "Text Analytics", "Speech Service"], correct: 2 },
    { text: "Un chatbot necesita entender las intenciones del usuario ('reservar', 'comprar', 'consultar'). \xBFQu\xE9 servicio de Azure permite esto?", options: ["Text Analytics", "QnA Maker", "Azure AI Language (AI Studio/LUIS)", "Translator"], correct: 2 },
    { text: "Para traducir autom\xE1ticamente contenido de espa\xF1ol a ingl\xE9s, \xBFqu\xE9 servicio de Azure usar\xEDas?", options: ["Text Analytics", "Translator", "Speech Services", "QnA Maker"], correct: 1 },
    { text: "Para crear un chatbot de preguntas frecuentes desde documentos PDF existentes, \xBFqu\xE9 servicio usar\xEDas?", options: ["Text Analytics", "Translator", "QnA Maker", "Speech Services"], correct: 2 },
    { text: "Para convertir la voz de un usuario en texto (transcripci\xF3n), \xBFqu\xE9 servicio de Azure es m\xE1s apropiado?", options: ["Translator", "QnA Maker", "Speech-to-Text", "Text Analytics"], correct: 2 }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Simulacro de Examen" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl"> ${renderComponent($$result2, "ExamMode", ExamMode, { "client:load": true, "questions": questions, "client:component-hydration": "load", "client:component-path": "D:/Cursos/AI-900-SPANISH/ai-900-study/src/components/ExamMode.vue", "client:component-export": "default" })} </div> ` })}`;
}, "D:/Cursos/AI-900-SPANISH/ai-900-study/src/pages/exam/simulacro.astro", void 0);

const $$file = "D:/Cursos/AI-900-SPANISH/ai-900-study/src/pages/exam/simulacro.astro";
const $$url = "/exam/simulacro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Simulacro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
