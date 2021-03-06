import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import { Request, Response, NextFunction } from 'express'
import type { ErrorRequestHandler } from "express";

import notesRouter from './routes/api/notes'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message })
}

app.use(errorHandler)


export default app
