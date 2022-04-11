import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import notes from './notes.json'
import { fileURLToPath } from 'url'
import path from 'path'

import { Note, StatsType } from '../types'

const __dirname: string = path.dirname(fileURLToPath(import.meta.url))
const notesPath: string = path.join(__dirname, 'notes.json')

interface CreateBodyType {
  text: string,
  category: string,
  time: string
}

interface UpdateBodyType {
  text?: string,
  category?: string,
  time?: string
}

const listNotes = () => {
  return notes
}

const getNoteById = (noteId: string) => {
  const note: Note | undefined = notes.find(note => note.id == noteId)
  return note
}

const listStats = () => {
  const allCategories: string[] = notes.map(note => {
    return note.category
  })

  const uniqueCategories: string[] = Array.from(new Set(allCategories))

  const stats: StatsType[] = uniqueCategories.map(uniqueCategory => {
      const obj: StatsType = {
          [uniqueCategory]: {
              active: notes.filter(note => note.category === uniqueCategory && note.archived === false).length,
              archived: notes.filter(note => note.category === uniqueCategory && note.archived === true).length,
          }
      }
      return obj
  })

  return stats
}

const removeNote = async (noteId: string) => {
  const noteExists: Note | undefined = await getNoteById(noteId)
  if (!noteExists) {
    return null
  }

  const notesAfterRemoval: Note[] = notes.filter((note) => note.id != noteId)
  await fs.writeFile(notesPath, JSON.stringify(notesAfterRemoval, null, 2))
  return notesAfterRemoval
}

const addNote = async (body: CreateBodyType) => {
  const newNote: Note = { id: randomUUID(), ...body, archived: false };
  notes.push(newNote)
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
  return newNote
}

const updateNote = async (noteId: string, body: UpdateBodyType) => {
  const noteExists = await getNoteById(noteId)
  if (!noteExists) {
    return null
  }

  const index: number = notes.findIndex((note) => note.id === noteId)
  const updatedNote: Note = { ...notes[index], ...body };

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
