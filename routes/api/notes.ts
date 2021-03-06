import express, { NextFunction, Request, Response, Router } from 'express'
import model from '../../model/index'
import { validateCreate, validateUpdate, validateId } from './validation'

import { Note, StatsType } from '../../types'

const router: Router = express.Router()


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const notes: Note[] = await model.listNotes()
  res.status(200).json( notes )
})

router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  const notesStats: StatsType[] = await model.listStats()
  res.status(200).json( notesStats )
})

router.get('/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const note: Note | undefined = await model.getNoteById(id)
  note ? res.status(200).json(note) : res.status(404).json({ message: "Not found" })
})

router.post('/', validateCreate, async (req: Request, res: Response, next: NextFunction) => {
  const newNotes: Note = await model.addNote(req.body)
  res.status(201).json(newNotes)
})

router.delete('/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const note: Note[] | null = await model.removeNote(id)
  note ? res.status(200).json({message: "note deleted"}) : res.status(404).json({ message: "Not found" })
})

router.patch('/:id', validateId, validateUpdate, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const note: Note | null = await model.updateNote(id, req.body)
  note ? res.status(200).json(note) : res.status(404).json({ message: "Not Found" })
})

export default router
