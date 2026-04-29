# Arquitectura de EducaInteractiva

## Estructura General

EducaInteractiva es una aplicación educativa interactiva dividida en 4 módulos principales:

1. **Juegos de Palabras** (Crucigrama, Sopa de Letras, Ahorcado)
2. **Nutrición** (Plato Balanceado, Grupos de Alimentos)
3. **Sistema Nervioso Central** (Partes, Funciones, Quiz)
4. **Workshop Final** (Evaluación integrada)

## Estructura de Carpetas

```
client/src/
├── pages/
│   ├── Home.tsx              # Página principal con navegación
│   ├── WordGames.tsx         # Módulo de juegos de palabras
│   ├── Nutrition.tsx         # Módulo de nutrición
│   ├── NervousSystem.tsx     # Módulo del sistema nervioso
│   └── Workshop.tsx          # Workshop final de evaluación
├── components/
│   ├── games/
│   │   ├── Crossword.tsx     # Componente de crucigrama
│   │   ├── WordSearch.tsx    # Componente de sopa de letras
│   │   └── Hangman.tsx       # Componente de ahorcado
│   ├── nutrition/
│   │   ├── BalancedPlate.tsx # Simulador de plato balanceado
│   │   └── FoodGroups.tsx    # Información de grupos de alimentos
│   ├── nervous/
│   │   ├── NervousSystemDiagram.tsx # Diagrama interactivo
│   │   └── NervousSystemQuiz.tsx    # Quiz del sistema nervioso
│   ├── workshop/
│   │   ├── WorkshopProgress.tsx     # Barra de progreso
│   │   └── ResultsCard.tsx          # Tarjeta de resultados
│   ├── common/
│   │   ├── Header.tsx        # Encabezado con navegación
│   │   ├── Sidebar.tsx       # Barra lateral de navegación
│   │   └── ScoreBoard.tsx    # Panel de puntuación
│   └── ui/                   # Componentes shadcn/ui
├── contexts/
│   ├── GameContext.tsx       # Estado global de juegos
│   ├── UserContext.tsx       # Estado del usuario y puntuación
│   └── ThemeContext.tsx      # Estado del tema
├── hooks/
│   ├── useGameState.ts       # Hook para estado de juegos
│   ├── useScore.ts           # Hook para puntuación
│   └── useWorkshopProgress.ts # Hook para progreso del workshop
├── lib/
│   ├── gameLogic.ts          # Lógica de juegos
│   ├── calculateScore.ts     # Cálculo de puntuaciones
│   └── utils.ts              # Utilidades generales
├── App.tsx                   # Componente raíz
├── main.tsx                  # Punto de entrada
└── index.css                 # Estilos globales
```

## Flujo de Datos

### Estado Global (Context API)

**UserContext:**
- `totalScore`: Puntuación total acumulada
- `completedModules`: Módulos completados
- `userAnswers`: Respuestas del usuario
- `currentModule`: Módulo actual

**GameContext:**
- `currentGame`: Juego actual en progreso
- `gameState`: Estado del juego (playing, won, lost)
- `attempts`: Intentos realizados

## Componentes Principales

### 1. Juegos de Palabras

**Crossword.tsx**
- Renderiza un crucigrama interactivo
- Permite entrada de texto en celdas
- Valida respuestas horizontales y verticales
- Proporciona pistas contextuales

**WordSearch.tsx**
- Genera una cuadrícula de letras
- Permite seleccionar palabras (drag o click)
- Resalta palabras encontradas
- Cuenta palabras restantes

**Hangman.tsx**
- Muestra palabra oculta con guiones
- Permite seleccionar letras
- Dibuja el ahorcado progresivamente
- Cuenta intentos restantes

### 2. Nutrición

**BalancedPlate.tsx**
- Componente drag-and-drop interactivo
- Muestra un plato circular dividido en secciones
- Permite arrastrar alimentos a secciones
- Valida si el plato está balanceado
- Proporciona retroalimentación

**FoodGroups.tsx**
- Tarjetas informativas de grupos de alimentos
- Muestra ejemplos, porciones y beneficios
- Código de colores por grupo

### 3. Sistema Nervioso Central

**NervousSystemDiagram.tsx**
- Diagrama interactivo del sistema nervioso
- Partes etiquetadas y clickeables
- Muestra descripciones al hacer hover/click
- Animaciones suaves

**NervousSystemQuiz.tsx**
- Quiz de opción múltiple
- Retroalimentación inmediata
- Explicaciones de respuestas correctas

### 4. Workshop Final

**WorkshopProgress.tsx**
- Barra de progreso visual
- Muestra secciones completadas
- Indica puntuación parcial

**ResultsCard.tsx**
- Resumen de resultados
- Puntuación final
- Feedback personalizado
- Opción de reintentar

## Estilos y Temas

**Paleta de Colores:**
- Nutrición: Rojo (#EF4444)
- Sistema Nervioso: Azul (#0EA5E9)
- Juegos: Verde (#10B981)
- Logros: Amarillo (#FBBF24)

**Tipografía:**
- Display: Poppins Bold
- Body: Inter Regular
- Accent: Poppins SemiBold

## Flujo de Navegación

```
Home (Menú Principal)
├── Word Games
│   ├── Crossword
│   ├── Word Search
│   └── Hangman
├── Nutrition
│   ├── Balanced Plate
│   └── Food Groups Info
├── Nervous System
│   ├── System Diagram
│   └── Quiz
└── Workshop (Evaluación Final)
    └── Results
```

## Puntuación y Evaluación

**Cálculo de Puntos:**
- Cada módulo: 0-100 puntos
- Juegos de Palabras: 25% del total
- Nutrición: 25% del total
- Sistema Nervioso: 25% del total
- Quiz Final: 25% del total

**Criterios de Éxito:**
- Puntuación mínima para pasar: 70%
- Feedback basado en rango de puntuación
- Opción de reintentar cada módulo

## Tecnologías

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Routing:** Wouter
- **State Management:** React Context API
- **Animations:** Framer Motion
- **Icons:** Lucide React
