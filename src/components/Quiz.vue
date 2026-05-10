<template>
  <div class="quiz-container max-w-2xl mx-auto">
    <div v-if="!showResults" class="space-y-8">
      <!-- Progress Header -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black uppercase tracking-widest text-foreground/40">
            Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
          </span>
          <div class="flex items-center gap-2">
            <div class="h-2 w-32 bg-surface-border rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary transition-all duration-500 ease-out"
                :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"
              ></div>
            </div>
            <span class="text-xs font-bold text-primary">{{ Math.round((currentIndex + 1) / questions.length * 100) }}%</span>
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <Transition name="slide-fade" mode="out-in">
        <div :key="currentIndex" class="space-y-8">
          <div class="glass p-8 rounded-3xl border-primary/10 shadow-xl shadow-primary/5">
            <h3 class="text-2xl font-bold leading-tight text-foreground">
              {{ currentQuestion.text }}
            </h3>
          </div>

          <!-- Options -->
          <div class="space-y-3">
            <button
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              @click="selectAnswer(idx)"
              :class="[
                'quiz-option group',
                selectedAnswer === idx ? 'selected' : '',
                showFeedback && idx === currentQuestion.correct ? 'correct' : '',
                showFeedback && selectedAnswer === idx && idx !== currentQuestion.correct ? 'incorrect' : ''
              ]"
              :disabled="showFeedback"
            >
              <div 
                class="w-10 h-10 rounded-xl border border-surface-border flex items-center justify-center mr-4 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10"
                :class="{ 'bg-primary text-white border-primary': selectedAnswer === idx }"
              >
                <span class="font-bold text-sm">{{ String.fromCharCode(65 + idx) }}</span>
              </div>
              <span class="flex-1 font-medium">{{ option }}</span>
              
              <!-- Icon feedback -->
              <div v-if="showFeedback && idx === currentQuestion.correct" class="ml-4 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div v-if="showFeedback && selectedAnswer === idx && idx !== currentQuestion.correct" class="ml-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
            </button>
          </div>

          <!-- Feedback Box -->
          <Transition name="expand">
            <div v-if="showFeedback" class="p-6 rounded-2xl border animate-fade-in" :class="isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-800 dark:text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-300'">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xl">{{ isCorrect ? '✨' : '💡' }}</span>
                <p class="font-bold">{{ isCorrect ? '¡Excelente!' : 'Casi lo tienes' }}</p>
              </div>
              <p class="text-sm opacity-80 leading-relaxed">{{ currentQuestion.explanation }}</p>
            </div>
          </Transition>

          <!-- Navigation -->
          <div class="flex justify-end pt-4">
            <button
              v-if="!showFeedback"
              @click="submitAnswer"
              :disabled="selectedAnswer === null"
              class="btn-primary flex items-center gap-2 group disabled:opacity-50 disabled:scale-100"
            >
              Verificar
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button
              v-else
              @click="nextQuestion"
              class="btn-primary flex items-center gap-2 group"
            >
              {{ currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados' }}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Results Section -->
    <div v-else class="text-center py-12 space-y-8 animate-fade-in">
      <div class="relative inline-block">
        <div class="text-8xl mb-4 relative z-10">{{ score >= questions.length * 0.7 ? '🏆' : '🎯' }}</div>
        <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 -z-10"></div>
      </div>
      
      <div>
        <h3 class="text-4xl font-black mb-2">¡Quiz Completado!</h3>
        <p class="text-foreground/50 text-lg">Has demostrado tus conocimientos en este módulo.</p>
      </div>

      <div class="flex justify-center gap-12 py-8">
        <div>
          <div class="text-4xl font-black text-primary">{{ score }}</div>
          <div class="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Aciertos</div>
        </div>
        <div class="w-px h-12 bg-surface-border"></div>
        <div>
          <div class="text-4xl font-black text-primary">{{ Math.round((score / questions.length) * 100) }}%</div>
          <div class="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Puntuación</div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button @click="restartQuiz" class="btn-secondary">Reintentar</button>
        <a href="/" class="btn-primary">Ir al Inicio</a>
      </div>
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

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>