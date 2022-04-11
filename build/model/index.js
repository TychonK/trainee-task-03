var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import notes from './notes.json';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const notesPath = path.join(__dirname, 'notes.json');
const listNotes = () => {
    return notes;
};
const getNoteById = (noteId) => {
    const note = notes.find(note => note.id == noteId);
    return note;
};
const listStats = () => {
    const allCategories = notes.map(note => {
        return note.category;
    });
    const uniqueCategories = Array.from(new Set(allCategories));
    const stats = uniqueCategories.map(uniqueCategory => {
        const obj = {
            [uniqueCategory]: {
                active: notes.filter(note => note.category === uniqueCategory && note.archived === false).length,
                archived: notes.filter(note => note.category === uniqueCategory && note.archived === true).length,
            }
        };
        return obj;
    });
    return stats;
};
const removeNote = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    const noteExists = yield getNoteById(noteId);
    if (!noteExists) {
        return null;
    }
    const notesAfterRemoval = notes.filter((note) => note.id != noteId);
    yield fs.writeFile(notesPath, JSON.stringify(notesAfterRemoval, null, 2));
    return notesAfterRemoval;
});
const addNote = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = Object.assign(Object.assign({ id: randomUUID() }, body), { archived: false });
    notes.push(newNote);
    yield fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
    return newNote;
});
const updateNote = (noteId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const noteExists = yield getNoteById(noteId);
    if (!noteExists) {
        return null;
    }
    const index = notes.findIndex((note) => note.id === noteId);
    const updatedNote = Object.assign(Object.assign({}, notes[index]), body);
    notes[index] = updatedNote;
    yield fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
    return updatedNote;
});
export default {
    listNotes,
    listStats,
    getNoteById,
    removeNote,
    addNote,
    updateNote,
};
