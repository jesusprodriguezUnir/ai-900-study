<template>
  <div class="exam-container">
    <div v-if="!examStarted" class="text-center py-12">
      <div class="text-6xl mb-6">📝</div>
      <h2 class="text-2xl font-bold mb-4">Simulacro de Examen AI-900</h2>
      <p class="text-lg text-foreground/60 mb-6 max-w-xl mx-auto">
        Este simulacro contiene 40 preguntas que cubren todos los dominios del examen.
        Dispones de 60 minutos para completarlo.
      </p>
      <div class="bg-surface p-6 rounded-lg mb-6 max-w-md mx-auto">
        <ul class="text-left space-y-2">
          <li>📋 <strong>40 preguntas</strong></li>
          <li>⏱️ <strong>60 minutos</strong></li>
          <li>📊 <strong>70%</strong> para aprobar</li>
          <li>💾 <strong>Guardado automático</strong></li>
        </ul>
      </div>
      <button @click="startExam" class="btn-primary text-lg px-8 py-4">
        Iniciar Examen
      </button>
    </div>

    <div v-else-if="!showResults" class="space-y-6">
      <div class="flex items-center justify-between bg-surface p-4 rounded-lg">
        <div class="flex items-center gap-4">
          <span class="text-sm text-foreground/60">
            Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
          </span>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="(q, idx) in questions"
              :key="idx"
              class="w-6 h-6 rounded flex items-center justify-center text-xs"
              :class="answers[idx] !== undefined ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-700'"
            >
              {{ idx + 1 }}
            </span>
          </div>
        </div>
        <div class="text-xl font-mono" :class="timeLeft < 300 ? 'text-red-500' : ''">
          {{ formatTime(timeLeft) }}
        </div>
      </div>

      <div class="bg-surface p-6 rounded-lg">
        <p class="text-lg font-medium">{{ currentQuestion.text }}</p>
      </div>

      <div class="space-y-3">
        <button
          v-for="(option, idx) in currentQuestion.options"
          :key="idx"
          @click="selectAnswer(idx)"
          :class="[
            'quiz-option',
            answers[currentIndex] === idx ? 'selected' : ''
          ]"
        >
          <span class="font-medium mr-2">{{ String.fromCharCode(65 + idx) }}.</span>
          {{ option }}
        </button>
      </div>

      <div class="flex justify-between">
        <button
          @click="prevQuestion"
          :disabled="currentIndex === 0"
          class="btn-secondary"
        >
          Anterior
        </button>
        <button
          @click="nextOrFinish"
          class="btn-primary"
        >
          {{ currentIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar Examen' }}
        </button>
      </div>
    </div>

    <div v-else class="text-center py-8 max-w-2xl mx-auto">
      <div class="text-6xl mb-4">{{ passed ? '🎉' : '📚' }}</div>
      <h3 class="text-2xl font-bold mb-4">Resultados del Examen</h3>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-surface p-4 rounded-lg">
          <p class="text-sm text-foreground/60">Puntuación</p>
          <p class="text-2xl font-bold">{{ score }}/{{ questions.length }}</p>
        </div>
        <div class="bg-surface p-4 rounded-lg">
          <p class="text-sm text-foreground/60">Porcentaje</p>
          <p class="text-2xl font-bold" :class="passed ? 'text-green-500' : 'text-red-500'">
            {{ Math.round((score / questions.length) * 100) }}%
          </p>
        </div>
      </div>

      <p class="text-lg mb-6">
        {{ passed ? '¡Felicidades! Has aprobado el simulacro.' : 'No has alcanzado la puntuación mínima. Repasa los temas y vuelve a intentarlo.' }}
      </p>

      <div class="space-y-3">
        <button @click="restartExam" class="btn-primary w-full">Realizar Otro Intento</button>
        <a href="/" class="btn-secondary w-full inline-block">Volver al Inicio</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

interface Question {
  text: string;
  options: string[];
  correct: number;
}

const props = defineProps<{
  questions: Question[];
}>();

const examStarted = ref(false);
const showResults = ref(false);
const currentIndex = ref(0);
const answers = ref<(number | undefined)[]>(new Array(props.questions.length).fill(undefined));
const score = ref(0);
const timeLeft = ref(60 * 60);
let timerInterval: number | null = null;

const currentQuestion = computed(() => props.questions[currentIndex.value]);
const passed = computed(() => (score.value / props.questions.length) >= 0.7);

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
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function selectAnswer(idx: number) {
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
  score.value = answers.value.filter((a, index) => a === props.questions[index].correct).length;
  showResults.value = true;

  const examHistory = JSON.parse(localStorage.getItem('ai900-exam-history') || '[]');
  examHistory.push({
    date: new Date().toISOString(),
    score: score.value,
    total: props.questions.length,
    passed: passed.value
  });
  localStorage.setItem('ai900-exam-history', JSON.stringify(examHistory));
}

function restartExam() {
  examStarted.value = false;
  showResults.value = false;
  currentIndex.value = 0;
  answers.value = new Array(props.questions.length).fill(undefined);
  score.value = 0;
  timeLeft.value = 60 * 60;
}

onUnmounted(() => {
  stopTimer();
});
</script>