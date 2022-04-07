var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import model from '../../model/index';
import { validateCreate, validateUpdate, validateId } from './validation';
const router = express.Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield model.listNotes();
    res.status(200).json(notes);
}));
router.get('/stats', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const notesStats = yield model.listStats();
    res.status(200).json(notesStats);
}));
router.get('/:id', validateId, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const note = yield model.getNoteById(id);
    note ? res.status(200).json(note) : res.status(404).json({ message: "Not found" });
}));
router.post('/', validateCreate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newNotes = yield model.addNote(req.body);
    res.status(201).json(newNotes);
}));
router.delete('/:id', validateId, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const note = yield model.removeNote(id);
    note ? res.status(200).json({ message: "note deleted" }) : res.status(404).json({ message: "Not found" });
}));
router.patch('/:id', validateId, validateUpdate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const note = yield model.updateNote(id, req.body);
    note ? res.status(200).json(note) : res.status(404).json({ message: "Not Found" });
}));
export default router;
