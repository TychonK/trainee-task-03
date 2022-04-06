import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import notes from './notes.json'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const notesPath = path.join(__dirname, 'notes.json')

const listNotes = () => {
  return notes
}

const getNoteById = (noteId) => {
  const note = notes.find(note => note.id == noteId)
  return note
}

const listStats = () => {
  const allCategories = notes.map(note => {
    return note.category
  })

  const uniqueCategories = Array.from(new Set(allCategories))

  const stats = uniqueCategories.map(uniqueCategory => {
      const obj = {
          [uniqueCategory]: {
              active: notes.filter(note => note.category === uniqueCategory && note.archived === false).length,
              archived: notes.filter(note => note.category === uniqueCategory && note.archived === true).length
          }
      }
      return obj
  })

  return stats
}

const removeNote = async (noteId) => {
  const noteExists = await getNoteById(noteId)
  if (!noteExists) {
    return null
  }

  const notesAfterRemoval = notes.filter((note) => note.id != noteId)
  await fs.writeFile(notesPath, JSON.stringify(notesAfterRemoval, null, 2))
  return notesAfterRemoval
}

const addNote = async (body) => {
  const newNote = { id: randomUUID(), ...body, archived: false };
  notes.push(newNote)
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
  return newNote
}

const updateNote = async (noteId, body) => {
  const noteExists = await getNoteById(noteId)
  if (!noteExists) {
    return null
  }

  const index = notes.findIndex((note) => note.id === noteId)
  const updatedNote = { ...notes[index], ...body };

  notes[index] = updatedNote
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
  return updatedNote
}

export default {
  listNotes,
  listStats,
  getNoteById,
  removeNote,
  addNote,
  updateNote,
}
