# Prompt para Diseñador — Ben

## ¿Qué es Ben?

Plataforma de orientación vocacional que ayuda a estudiantes secundarios a descubrir qué carrera universitaria se alinea con su perfil, combinando un test vocacional con un asistente IA conversacional. Además, permite a egresados compartir experiencias reales sobre sus carreras para que los estudiantes tomen decisiones informadas.

## Flujo del Usuario (Estudiante)

### 1. Landing / Pantalla de inicio
- Hero con frase tipo *"Descubrí qué carrera se adapta a vos"*
- Botón CTA principal: **"Comenzar test vocacional"**
- Sección breve explicando cómo funciona (3 pasos: hacé el test, hablá con la IA, conocé carreras)
- Opción secundaria: **"Chatear con el asistente IA"** (sin hacer el test)

### 2. Test vocacional (quiz)
- Pantalla con pregunta única + 4 opciones de respuesta
- Indicador de progreso (ej: "Pregunta 5 de 15")
- Barra de progreso visual
- Al llegar a la mitad: pregunta "¿Preferís carreras cortas o largas?" (selector de duración)
- Al finalizar: animación de "calculando..." mientras se procesa el perfil
- Breakpoints: evitar fatiga — si son muchas preguntas, mostrar en varias tandas con breve pausa

### 3. Resultado del test
- Carrera recomendada con porcentaje de match
- Gráfico de habilidades (radar chart 4 ejes: lógico, creativo, social, investigativo)
- Comparación visual entre perfil del usuario y perfil requerido por la carrera
- Botones de acción:
  - **"Ver más carreras"** → lista de carreras ordenadas por match
  - **"Hablar con la IA"** → abre el chat con contexto del resultado
  - **"Ver experiencias de egresados"** → abre sección de experiencias para esa carrera

### 4. Chat con asistente IA
- Interfaz de chat tipo WhatsApp/Messenger
- Avatar del asistente (logo de Ben o ilustración amigable)
- El asistente puede:
  - Recomendar carreras según intereses
  - Mostrar facultades disponibles
  - Explicar duración de carreras
  - Mostrar estadísticas y experiencias de egresados
  - Responder preguntas generales sobre las carreras
- Burbujas de texto con el usuario a la derecha, asistente a la izquierda
- Indicador de "escribiendo..." mientras la IA procesa

### 5. Explorar carreras
- Lista de todas las carreras con:
  - Nombre + facultad
  - Duración
  - Breve descripción
  - Keywords / áreas de interés
  - Porcentaje de match si ya hizo el test
- Filtros: por facultad, por duración (corta/larga)
- Búsqueda por nombre o keyword
- Al hacer clic en una carrera → detalle con:
  - Descripción completa
  - Habilidades requeridas (radar chart)
  - Testimonios / experiencias de egresados
  - Materias difíciles más mencionadas
  - Salidas laborales comunes

### 6. Experiencias de egresados
- Tarjetas de experiencia con:
  - Nombre del egresado
  - Año de graduación
  - Tiempo real de cursada
  - Tasa de deserción percibida
  - Materias más difíciles
  - Salidas laborales
  - Reseña textual
- Sección para que el estudiante pueda completar su propia experiencia si es egresado

## Flujo del Egresado

### 1. Formulario de experiencia
- Formulario con campos:
  - Nombre y email
  - Carrera cursada (selector)
  - Año de graduación
  - Duración real de la cursada
  - Porcentaje de deserción percibido (slider 0-100)
  - Materias más difíciles (agregar varias)
  - Salidas laborales (agregar varias con rango salarial)
  - Reseña / consejos para futuros estudiantes (texto libre)
- Diseño limpio, paso a paso o en una sola página con secciones claras

## Flujo del Admin

### Dashboard
- Cards con métricas: total facultades, carreras, preguntas, sesiones de test, experiencias cargadas
- Gráficos: preguntas por tipo (estudiante vs egresado), sesiones en el tiempo

### CRUDs
- Tablas con listado de facultades / carreras / preguntas
- Botones: crear, editar, eliminar
- Modal o página dedicada para cada formulario
- Para preguntas: editor visual con campos según tipo (multiple choice con opciones, texto, número, rating)

## Identidad Visual

### Marca
- Nombre: **Ben** (corto, amigable, fácil de recordar)
- Tagline sugerido: *"Tu futuro empieza acá"* o *"Encontrá tu camino"*
- Tono: juvenil, moderno, de confianza

### Paleta de colores sugerida
- Primary: azul/violeta (transmite confianza, creatividad)
- Secondary: tonos cálidos (naranja/ámbar para CTAs)
- Neutros: grises claros para fondos, blanco para tarjetas
- Acento: verde para aciertos/match, rojo suave para errores

### Tipografía
- Sans-serif moderna (Inter, Poppins, o similar)
- Jerarquía clara: títulos bold, cuerpo regular

### Componentes UI clave
- **Radar chart** para perfil de habilidades
- **Barra de progreso** para el test
- **Selector de duración** (corta/larga) con toggle visual
- **Modal o drawer** para formularios admin
- **Tarjeta de carrera** con hover reveal
- **Burbujas de chat** con diseño consistente

## Consideraciones Técnicas para Diseño

- Responsive: mobile first (muchos usuarios serán desde el celular)
- Modo oscuro opcional
- Estados vacíos: qué mostrar cuando no hay datos (ej: "Todavía no hay experiencias para esta carrera")
- Estados de carga: skeletons o spinners
- Micro-interacciones: animaciones suaves en transiciones, hover en cards
- Accesibilidad: contraste suficiente, labels en formularios, focus visible

## Pantallas a diseñar (prioridad)

1. **Landing page** — hero, CTA, cómo funciona, footer
2. **Test vocacional** — pregunta + opciones + progreso
3. **Resultado** — carrera recomendada + radar chart + botones de acción
4. **Chat IA** — interfaz de conversación
5. **Lista de carreras** — buscador + filtros + cards
6. **Detalle de carrera** — info completa + radar + experiencias
7. **Formulario egresado** — experiencia paso a paso
8. **Login admin** — pantalla de autenticación
9. **Dashboard admin** — métricas y gráficos
10. **CRUD admin** — tabla + modal formulario
