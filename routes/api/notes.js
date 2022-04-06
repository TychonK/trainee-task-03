import express from 'express'
import model from '../../model/index'
import { validateCreate, validateUpdate, validateId } from './validation'

const router = express.Router()

router.get('/notes', async (req, res, next) => {
  const notes = await model.listNotes()
  res.status(200).json( notes )
})

router.get('notes/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const note = await model.getNoteById(id)
  note ? res.status(200).json(note) : res.status(404).json({ message: "Not found" })
})

router.post('/notes', validateCreate, async (req, res, next) => {
  const newNotes = await model.addNote(req.body)
  res.status(201).json(newNotes)
})

router.delete('notes/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const note = await model.removeNote(id)
  note ? res.status(200).json({message: "note deleted"}) : res.status(404).json({ message: "Not Found" })
})

router.patch('notes/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params
  const note = await model.updateNote(id, req.body)
  note ? res.status(200).json(note) : res.status(404).json({ message: "Not Found" })
})

export default router
