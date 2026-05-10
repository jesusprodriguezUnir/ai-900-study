<template>
  <div class="quiz-container">
    <div v-if="!showResults" class="space-y-6">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm text-[var(--color-text-secondary)]">
          Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
        </span>
        <span class="text-sm text-primary">Puntuación: {{ score }}/{{ currentIndex }}</span>
      </div>

      <div class="bg-[var(--color-bg-secondary)] p-6 rounded-lg">
        <p class="text-lg font-medium">{{ currentQuestion.text }}</p>
      </div>

      <div class="space-y-3">
        <button
          v-for="(option, idx) in currentQuestion.options"
          :key="idx"
          @click="selectAnswer(idx)"
          :class="[
            'quiz-option',
            selectedAnswer === idx ? 'selected' : '',
            showFeedback && idx === currentQuestion.correct ? 'correct' : '',
            showFeedback && selectedAnswer === idx && idx !== currentQuestion.correct ? 'incorrect' : ''
          ]"
          :disabled="showFeedback"
        >
          <span class="font-medium mr-2">{{ String.fromCharCode(65 + idx) }}.</span>
          {{ option }}
        </button>
      </div>

      <div v-if="showFeedback" class="p-4 rounded-lg" :class="isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'">
        <p class="font-medium mb-2">{{ isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto' }}</p>
        <p class="text-sm">{{ currentQuestion.explanation }}</p>
      </div>

      <div class="flex justify-between">
        <button
          v-if="!showFeedback"
          @click="submitAnswer"
          :disabled="selectedAnswer === null"
          :class="selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''"
          class="btn-primary"
        >
          Verificar Respuesta
        </button>
        <button
          v-else
          @click="nextQuestion"
          class="btn-primary"
        >
          {{ currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados' }}
        </button>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <div class="text-6xl mb-4">{{ score >= questions.length * 0.7 ? '🎉' : '📚' }}</div>
      <h3 class="text-2xl font-bold mb-2">Resultados del Quiz</h3>
      <p class="text-xl mb-4">
        Has respondido correctamente <span class="text-primary font-bold">{{ score }}</span> de <span class="font-bold">{{ questions.length }}</span> preguntas
      </p>
      <p class="text-lg mb-6">Puntuación: {{ Math.round((score / questions.length) * 100) }}%</p>
      <button @click="restartQuiz" class="btn-primary">Reiniciar Quiz</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Question {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

const props = defineProps<{
  questions: Question[];
  moduleId: string;
}>();

const currentIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const showFeedback = ref(false);
const score = ref(0);
const answeredQuestions = ref<Set<number>>(new Set());
const showResults = ref(false);

const currentQuestion = computed(() => props.questions[currentIndex.value]);
const isCorrect = computed(() => selectedAnswer.value === currentQuestion.value.correct);

function selectAnswer(idx: number) {
  if (!showFeedback.value) {
    selectedAnswer.value = idx;
  }
}

function submitAnswer() {
  if (selectedAnswer.value !== null) {
    showFeedback.value = true;
    if (isCorrect.value) {
      score.value++;
    }
  }
}

function nextQuestion() {
  answeredQuestions.value.add(currentIndex.value);
  saveProgress();

  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value++;
    selectedAnswer.value = null;
    showFeedback.value = false;
  } else {
    showResults.value = true;
  }
}

function restartQuiz() {
  currentIndex.value = 0;
  selectedAnswer.value = null;
  showFeedback.value = false;
  score.value = 0;
  answeredQuestions.value = new Set();
  showResults.value = false;
}

function saveProgress() {
  const moduleProgress = JSON.parse(localStorage.getItem('ai900-module-progress') || '{}');
  moduleProgress[props.moduleId] = {
    completed: true,
    score: score.value,
    total: props.questions.length,
    date: new Date().toISOString()
  };
  localStorage.setItem('ai900-module-progress', JSON.stringify(moduleProgress));
}
</script>