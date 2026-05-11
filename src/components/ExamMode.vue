<template>
  <div class="exam-container max-w-4xl mx-auto">
    <!-- Start Screen -->
    <div v-if="!examStarted" class="text-center py-12 space-y-12 animate-fade-in">
      <div class="relative inline-block">
        <div class="text-8xl mb-6 relative z-10">🚀</div>
        <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 -z-10"></div>
      </div>
      
      <div>
        <h2 class="text-4xl font-black mb-4 tracking-tight">Simulacro de Examen Oficial</h2>
        <p class="text-lg text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Esta prueba simula las condiciones reales del examen AI-900. Asegúrate de tener tiempo suficiente y un entorno tranquilo.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div class="glass p-6 rounded-3xl border border-surface-border">
          <div class="text-2xl mb-2">📋</div>
          <div class="text-xl font-bold">40</div>
          <div class="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Preguntas</div>
        </div>
        <div class="glass p-6 rounded-3xl border border-surface-border">
          <div class="text-2xl mb-2">⏱️</div>
          <div class="text-xl font-bold">60m</div>
          <div class="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Tiempo</div>
        </div>
        <div class="glass p-6 rounded-3xl border border-surface-border">
          <div class="text-2xl mb-2">🎯</div>
          <div class="text-xl font-bold">70%</div>
          <div class="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Para Aprobar</div>
        </div>
        <div class="glass p-6 rounded-3xl border border-surface-border">
          <div class="text-2xl mb-2">💾</div>
          <div class="text-xl font-bold">Auto</div>
          <div class="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Guardado</div>
        </div>
      </div>

      <button @click="startExam" class="btn-primary text-lg px-12 py-5 shadow-2xl shadow-primary/30">
        Comenzar Simulacro
      </button>
    </div>

    <!-- Active Exam -->
    <div v-else-if="!showResults" class="space-y-8 animate-fade-in">
      <!-- Header / Progress bar -->
      <div class="sticky top-24 z-30 glass p-6 rounded-3xl border-primary/20 shadow-xl shadow-primary/5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-4 flex-1">
            <div class="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span class="text-foreground/40">Progreso del examen</span>
              <span class="text-primary">{{ Math.round(((currentIndex + 1) / questions.length) * 100) }}%</span>
            </div>
            <div class="h-2 w-full bg-surface-border rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"
              ></div>
            </div>
          </div>
          
          <div class="flex items-center gap-6 px-6 py-3 bg-surface/50 rounded-2xl border border-surface-border">
            <div class="flex flex-col items-center">
              <span class="text-[8px] uppercase tracking-widest font-bold text-foreground/40 mb-1">Tiempo restante</span>
              <span class="text-2xl font-mono font-bold" :class="timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-foreground'">
                {{ formatTime(timeLeft) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Question Grid Mini -->
        <div class="mt-6 flex gap-1.5 flex-wrap">
          <button
            v-for="(q, idx) in questions"
            :key="idx"
            @click="currentIndex = idx"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300"
            :class="[
              currentIndex === idx ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-background' : '',
              answers[idx] !== undefined ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-border/50 text-foreground/40 hover:bg-surface-border'
            ]"
          >
            {{ idx + 1 }}
          </button>
        </div>
      </div>

      <!-- Question Content -->
      <Transition name="slide-fade" mode="out-in">
        <div :key="currentIndex" class="space-y-8">
          <div class="glass p-8 md:p-12 rounded-[2rem] border-primary/10 shadow-2xl shadow-primary/5">
            <h3 class="text-2xl md:text-3xl font-bold leading-tight text-foreground">
              {{ currentQuestion.text }}
            </h3>
          </div>

          <!-- Options -->
          <div class="grid grid-cols-1 gap-3">
            <button
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              @click="selectAnswer(idx)"
              :class="[
                'quiz-option group flex items-center w-full text-left p-6 rounded-2xl border transition-all duration-300',
                answers[currentIndex] === idx 
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/20' 
                  : 'border-surface-border hover:border-primary/50 hover:bg-primary/5'
              ]"
            >
              <div 
                class="w-10 h-10 rounded-xl border border-surface-border flex items-center justify-center mr-6 shrink-0 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10"
                :class="{ 'bg-primary text-white border-primary shadow-lg shadow-primary/20': answers[currentIndex] === idx }"
              >
                <span class="font-bold text-sm">{{ String.fromCharCode(65 + idx) }}</span>
              </div>
              <span class="flex-1 font-medium text-lg leading-snug">{{ option }}</span>
            </button>
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between pt-8">
            <button
              @click="prevQuestion"
              :disabled="currentIndex === 0"
              class="btn-secondary flex items-center gap-2 group disabled:opacity-30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform rotate-180"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Anterior
            </button>
            <button
              @click="nextOrFinish"
              class="btn-primary flex items-center gap-2 group"
            >
              {{ currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Examen' }}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Results Screen -->
    <div v-else class="text-center py-12 space-y-12 animate-fade-in">
      <div class="relative inline-block">
        <div class="text-9xl mb-6 relative z-10">{{ passed ? '🏆' : '📚' }}</div>
        <div class="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 -z-10"></div>
      </div>
      
      <div>
        <h2 class="text-5xl font-black mb-4 tracking-tight">
          {{ passed ? '¡Has aprobado!' : 'Necesitas repasar' }}
        </h2>
        <p class="text-xl text-foreground/50 max-w-xl mx-auto leading-relaxed">
          {{ passed 
            ? 'Excelente trabajo. Estás muy cerca de conseguir tu certificación AI-900.' 
            : 'No te desanimes. Revisa los módulos donde tuviste más dudas y vuelve a intentarlo.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div class="glass p-10 rounded-[2.5rem] border-surface-border">
          <div class="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">Puntuación</div>
          <div class="text-6xl font-black text-primary">{{ score }}<span class="text-2xl text-foreground/20 font-medium">/{{ questions.length }}</span></div>
        </div>
        <div class="glass p-10 rounded-[2.5rem] border-surface-border">
          <div class="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">Porcentaje</div>
          <div class="text-6xl font-black" :class="passed ? 'text-green-500' : 'text-red-500'">
            {{ Math.round((score / questions.length) * 100) }}%
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4 pt-8">
        <button @click="restartExam" class="btn-primary text-lg px-12 py-5 shadow-xl shadow-primary/20">Reintentar Examen</button>
        <a href="/" class="btn-secondary text-lg px-12 py-5">Volver al Inicio</a>
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

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>