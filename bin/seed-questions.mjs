import mongoose from 'mongoose';
import { config } from '../src/config/index.js';

const questions = [
  {
    questionText: '¿Prefieres resolver problemas, crear cosas o ayudar a otras personas?',
    category: 'logical',
    order: 1,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Resolver problemas',
        score: { logical: 3, creative: 0, social: 0, investigative: 1 },
      },
      {
        text: 'Crear cosas',
        score: { logical: 0, creative: 3, social: 0, investigative: 1 },
      },
      {
        text: 'Ayudar a otras personas',
        score: { logical: 1, creative: 0, social: 3, investigative: 0 },
      },
      {
        text: 'Las tres por igual',
        score: { logical: 2, creative: 2, social: 2, investigative: 2 },
      },
    ],
  },
  {
    questionText: '¿Eres una persona que le gusta investigar?',
    category: 'investigative',
    order: 2,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Sí, me encanta descubrir cosas nuevas',
        score: { logical: 1, creative: 0, social: 0, investigative: 3 },
      },
      {
        text: 'A veces, depende del tema',
        score: { logical: 1, creative: 0, social: 0, investigative: 1 },
      },
      {
        text: 'No mucho, prefiero hacer otras cosas',
        score: { logical: 0, creative: 1, social: 1, investigative: 0 },
      },
      {
        text: 'Prefiero no investigar',
        score: { logical: 0, creative: 1, social: 0, investigative: 0 },
      },
    ],
  },
  {
    questionText: '¿Qué tanto te gusta leer?',
    category: 'investigative',
    order: 3,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Me encanta leer, leo todo lo que puedo',
        score: { logical: 2, creative: 0, social: 0, investigative: 2 },
      },
      {
        text: 'Leo ocasionalmente, cuando encuentro algo interesante',
        score: { logical: 0, creative: 1, social: 1, investigative: 0 },
      },
      {
        text: 'Solo leo lo necesario para estudiar',
        score: { logical: 1, creative: 0, social: 0, investigative: 1 },
      },
      {
        text: 'No me gusta leer',
        score: { logical: 0, creative: 1, social: 1, investigative: 0 },
      },
    ],
  },
  {
    questionText: '¿Eres bueno con los números?',
    category: 'logical',
    order: 4,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Sí, se me dan muy bien',
        score: { logical: 3, creative: 0, social: 0, investigative: 1 },
      },
      {
        text: 'Regular, me defiendo',
        score: { logical: 1, creative: 0, social: 0, investigative: 1 },
      },
      {
        text: 'No mucho, prefiero las letras',
        score: { logical: 0, creative: 1, social: 1, investigative: 0 },
      },
      {
        text: 'Los evito en lo posible',
        score: { logical: 0, creative: 2, social: 0, investigative: 0 },
      },
    ],
  },
  {
    questionText: '¿Qué tipo de actividades disfrutas más?',
    category: 'creative',
    order: 5,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Actividades creativas (dibujar, escribir, música)',
        score: { logical: 0, creative: 3, social: 0, investigative: 1 },
      },
      {
        text: 'Deportes y actividades al aire libre',
        score: { logical: 0, creative: 1, social: 2, investigative: 0 },
      },
      {
        text: 'Juegos de mesa, rompecabezas y estrategia',
        score: { logical: 2, creative: 0, social: 0, investigative: 2 },
      },
      {
        text: 'Tecnología y videojuegos',
        score: { logical: 2, creative: 1, social: 0, investigative: 1 },
      },
    ],
  },
  {
    questionText: '¿Realizas alguna actividad extracurricular?',
    category: 'social',
    order: 6,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Sí, artística (música, teatro, pintura)',
        score: { logical: 0, creative: 3, social: 1, investigative: 0 },
      },
      {
        text: 'Sí, deportiva',
        score: { logical: 1, creative: 0, social: 2, investigative: 0 },
      },
      {
        text: 'Sí, académica (olimpiadas, robótica, ciencia)',
        score: { logical: 2, creative: 0, social: 0, investigative: 2 },
      },
      {
        text: 'No realizo ninguna',
        score: { logical: 0, creative: 0, social: 0, investigative: 0 },
      },
    ],
  },
  {
    questionText: '¿Tienes buena memoria?',
    category: 'logical',
    order: 7,
    target: 'student',
    questionType: 'multiple_choice',
    options: [
      {
        text: 'Sí, tengo muy buena memoria',
        score: { logical: 2, creative: 0, social: 0, investigative: 2 },
      },
      {
        text: 'Regular, como cualquier persona',
        score: { logical: 1, creative: 0, social: 1, investigative: 0 },
      },
      {
        text: 'No mucho, se me olvida todo',
        score: { logical: 0, creative: 1, social: 0, investigative: 0 },
      },
      {
        text: 'Depende del tema o la situación',
        score: { logical: 0, creative: 1, social: 1, investigative: 0 },
      },
    ],
  },
]

async function seedQuestions() {
  const targetUri = process.argv[2] || config.MONGODB_URI

  console.log('\n❓ Seeding questions...')
  console.log(`   URI: ${targetUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}\n`)

  try {
    await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })

    const db = mongoose.connection.db
    const QuestionModel = mongoose.model('Question', new mongoose.Schema({
      questionText: String,
      category: String,
      order: Number,
      target: String,
      questionType: String,
      options: [{
        text: String,
        score: {
          logical: Number,
          creative: Number,
          social: Number,
          investigative: Number,
        },
      }],
    }))

    await db.collection('questions').deleteMany({})

    const inserted = await QuestionModel.insertMany(questions)

    console.log(`   ✅ Inserted ${inserted.length} questions successfully\n`)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.log(`   ❌ Seed failed: ${error.message}\n`)
    process.exit(1)
  }
}

seedQuestions()
