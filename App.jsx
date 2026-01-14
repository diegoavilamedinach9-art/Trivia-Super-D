import React, { useState, useEffect } from 'react';
import { Trophy, Star, ArrowRight, RefreshCw, Home, Heart, Map, BookOpen, Calculator, Sparkles, Activity, AlertCircle } from 'lucide-react';

// Datos de las categorías
const CATEGORIES = [
  { id: 'math', name: 'Números', color: 'bg-blue-500', icon: <Calculator /> },
  { id: 'lang', name: 'Letras', color: 'bg-red-500', icon: <BookOpen /> },
  { id: 'geo', name: 'Mi Tierra', color: 'bg-green-500', icon: <Map /> },
  { id: 'nature', name: 'Selva', color: 'bg-emerald-600', icon: <Sparkles /> },
  { id: 'lit', name: 'Cuentos', color: 'bg-pink-500', icon: <BookOpen /> },
  { id: 'body', name: 'Mi Cuerpo', color: 'bg-purple-500', icon: <Heart /> },
];

// Lista de preguntas incluyendo Literatura y las anteriores
const QUESTIONS_DATA = [
  { id: 1, text: "¿Qué pueblo del sureste inventó el número cero?", options: ["Los Mayas", "Los Gigantes", "Los Astronautas"], correct: 0, cat: 'math' },
  { id: 2, text: "¿Cómo se llama el gato más grande y fuerte de nuestra selva?", options: ["Gato de casa", "Jaguar", "León"], correct: 1, cat: 'nature' },
  { id: 3, text: "¿De qué semilla sale el chocolate?", options: ["Cacao", "Frijol", "Arroz"], correct: 0, cat: 'nature' },
  { id: 4, text: "¿En qué estado cayó el asteroide de los dinosaurios?", options: ["Tabasco", "Yucatán", "Chiapas"], correct: 1, cat: 'geo' },
  { id: 5, text: "¿Quién tenía una nariz que crecía cuando decía mentiras?", options: ["Pinocho", "Peter Pan", "El Lobo"], correct: 0, cat: 'lit' },
  { id: 6, text: "¿De qué color es la caperucita del cuento?", options: ["Verde", "Azul", "Roja"], correct: 2, cat: 'lit' },
  { id: 7, text: "¿Quién perdió su zapatito de cristal en el baile?", options: ["Blanca Nieves", "Cenicienta", "La Sirenita"], correct: 1, cat: 'lit' },
  { id: 8, text: "¿Qué animal es 'Bambi'?", options: ["Un conejo", "Un venado", "Un tlacuache"], correct: 1, cat: 'lit' },
  { id: 9, text: "¿Cómo debe empezar siempre el nombre de una persona?", options: ["Con minúscula", "Con un dibujo", "Con Mayúscula"], correct: 2, cat: 'lang' },
  { id: 10, text: "¿Cuántos dedos tienes en total sumando tus dos manos?", options: ["5 dedos", "10 dedos", "20 dedos"], correct: 1, cat: 'math' },
];

// Retos físicos para cuando hay error
const PHYSICAL_CHALLENGES = [
  "¡Salta como un jaguar 5 veces!",
  "¡Da 3 vueltas como un trompo!",
  "¡Tócate la punta de los pies sin doblar las rodillas!",
  "¡Haz equilibrio en un solo pie mientras cuentas hasta 5!",
  "¡Corre en tu lugar muy rápido por 10 segundos!",
  "¡Imita el vuelo de un tucán moviendo tus brazos!"
];

export default function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, feedback, challenge, finished
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState('');

  // Imagen del superhéroe (Simulada con SVG estilizado para ser robusto)
  const SuperheroAvatar = () => (
    <div className="relative w-32 h-32 mx-auto mb-4 drop-shadow-lg">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="40" r="30" fill="#FFDBAC" /> {/* Cabeza */}
        <path d="M20 40 Q20 10 50 10 Q80 10 80 40" fill="#3B2619" /> {/* Pelo rizado */}
        <rect x="25" y="30" width="50" height="15" rx="5" fill="#1E3A8A" /> {/* Antifaz azul */}
        <circle cx="40" cy="37" r="4" fill="white" /> {/* Ojo L */}
        <circle cx="60" cy="37" r="4" fill="white" /> {/* Ojo R */}
        <path d="M40 55 Q50 65 60 55" stroke="red" strokeWidth="2" fill="none" /> {/* Sonrisa */}
        <path d="M30 70 L70 70 L80 100 L20 100 Z" fill="#1E3A8A" /> {/* Traje azul */}
        <path d="M20 70 Q10 70 5 90" fill="#FACC15" /> {/* Capa amarilla L */}
        <path d="M80 70 Q90 70 95 90" fill="#FACC15" /> {/* Capa amarilla R */}
        <circle cx="50" cy="85" r="8" fill="#FACC15" /> {/* Logo pecho */}
        <text x="46" y="90" fontSize="8" fontWeight="bold" fill="#1E3A8A">S</text>
      </svg>
    </div>
  );

  const startGame = () => {
    setScore(0);
    setQuestionCount(0);
    nextStep();
  };

  const nextStep = () => {
    if (questionCount >= 5) {
      setGameState('finished');
    } else {
      const randomIdx = Math.floor(Math.random() * QUESTIONS_DATA.length);
      setCurrentQuestion(QUESTIONS_DATA[randomIdx]);
      setGameState('playing');
    }
  };

  const handleAnswer = (index) => {
    const correct = index === currentQuestion.correct;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      setGameState('feedback');
    } else {
      const randomChallenge = PHYSICAL_CHALLENGES[Math.floor(Math.random() * PHYSICAL_CHALLENGES.length)];
      setCurrentChallenge(randomChallenge);
      setGameState('challenge');
    }
    setQuestionCount(q => q + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] font-sans text-slate-800 flex flex-col items-center justify-center p-4">
      {/* Contenedor Principal estilo App Móvil */}
      <div className="w-full max-w-sm bg-white rounded-[3rem] shadow-2xl border-8 border-slate-100 overflow-hidden relative">
        
        {/* Barra de Estado Superior */}
        <div className="bg-blue-600 p-6 pb-12 text-center text-white relative">
          <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
          </div>
          <h1 className="text-xl font-black mt-2">SUPER MARATÓN</h1>
          <p className="text-xs font-bold opacity-80 uppercase tracking-tighter">Edición Sureste de México</p>
        </div>

        {/* Contenido Dinámico */}
        <div className="p-6 -mt-8 bg-white rounded-t-[2.5rem] min-h-[450px] flex flex-col">
          
          {/* MENU INICIAL */}
          {gameState === 'menu' && (
            <div className="flex-1 flex flex-col justify-center items-center text-center py-4">
              <SuperheroAvatar />
              <h2 className="text-2xl font-extrabold text-blue-900 mb-2">¡Hola, Súper Amigo!</h2>
              <p className="text-slate-500 mb-8 px-4 leading-tight font-medium">
                Soy tu guía. Vamos a aprender sobre nuestra tierra y cuentos increíbles.
              </p>
              <button 
                onClick={startGame}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black py-5 px-12 rounded-2xl text-xl shadow-[0_6px_0_rgb(202,138,4)] transition-all active:translate-y-1 active:shadow-none"
              >
                ¡VAMOS A JUGAR!
              </button>
            </div>
          )}

          {/* JUGANDO */}
          {gameState === 'playing' && currentQuestion && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                  <span className="text-lg">{CATEGORIES.find(c => c.id === currentQuestion.cat)?.icon}</span>
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    {CATEGORIES.find(c => c.id === currentQuestion.cat)?.name}
                  </span>
                </div>
                <div className="text-blue-600 font-black">
                   {questionCount + 1}/5
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-500">
                <p className="text-lg font-bold text-blue-900 leading-snug">
                  {currentQuestion.text}
                </p>
              </div>

              <div className="grid gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="p-4 text-left bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 shadow-sm active:bg-blue-50 active:border-blue-400 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">{idx + 1}</div>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FEEDBACK (ACIERTOS) */}
          {gameState === 'feedback' && (
            <div className="flex-1 flex flex-col justify-center text-center space-y-6">
              <div className="animate-bounce">
                 <SuperheroAvatar />
              </div>
              <h2 className="text-3xl font-black text-green-500">¡SÚPER BIEN!</h2>
              <p className="text-lg font-bold text-slate-600 italic">"¡Eres muy inteligente, sigue así!"</p>
              <button 
                onClick={nextStep}
                className="bg-blue-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg flex items-center justify-center gap-2"
              >
                Siguiente <ArrowRight />
              </button>
            </div>
          )}

          {/* RETO FÍSICO (ERRORES) */}
          {gameState === 'challenge' && (
            <div className="flex-1 flex flex-col justify-center text-center space-y-6">
              <div className="bg-orange-100 p-4 rounded-3xl inline-block mx-auto animate-pulse">
                <Activity className="w-16 h-16 text-orange-500" />
              </div>
              <h2 className="text-2xl font-black text-orange-600 uppercase tracking-tighter">¡RETO DE ENERGÍA!</h2>
              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-dashed border-orange-300">
                <p className="text-xl font-black text-slate-700">
                  {currentChallenge}
                </p>
              </div>
              <p className="text-sm text-slate-400 font-bold italic">¡Haz el reto para poder continuar!</p>
              <button 
                onClick={nextStep}
                className="bg-orange-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg"
              >
                ¡LISTO, YA LO HICE!
              </button>
            </div>
          )}

          {/* RESULTADOS FINALES */}
          {gameState === 'finished' && (
            <div className="flex-1 flex flex-col justify-center text-center space-y-6">
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto" />
              <h2 className="text-3xl font-black text-blue-900">¡MISIÓN CUMPLIDA!</h2>
              <div className="bg-blue-50 p-6 rounded-3xl">
                <p className="text-slate-500 font-bold">Lograste</p>
                <p className="text-5xl font-black text-blue-600">{score}/5</p>
                <p className="text-slate-500 font-bold mt-2">puntos de superhéroe</p>
              </div>
              <button 
                onClick={() => setGameState('menu')}
                className="bg-green-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCw /> JUGAR OTRA VEZ
              </button>
            </div>
          )}
        </div>

        {/* Footer Navegación Estilo iOS/Android */}
        <div className="h-16 border-t border-slate-100 flex items-center justify-around px-8 bg-slate-50/50">
          <button onClick={() => setGameState('menu')} className="text-slate-400 hover:text-blue-500"><Home /></button>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center -mt-10 border-4 border-white shadow-lg text-white">
            <Star />
          </div>
          <button className="text-slate-400"><Activity /></button>
        </div>
      </div>

      {/* Instrucción de Instalación para los conocidos */}
      <div className="mt-8 text-center text-slate-400 text-xs max-w-xs leading-relaxed">
        <AlertCircle className="w-4 h-4 inline mr-1" />
        Para instalar: Toca "Compartir" en tu iPhone o los "3 puntos" en Android y elige <b>"Agregar a Inicio"</b>.
      </div>
    </div>
  );
}
