// src/routes/noteRoutes.ts

import { Router, Request, Response } from "express";
import { NoteController } from "../controllers/NoteController";
import { NoteRepository } from "../repositories/NoteRepository";
import { CreateNote } from "../use_cases/note/CreateNote";
import { GetNote } from "../use_cases/note/GetNote";
import { UpdateNote } from "../use_cases/note/UpdateNote";
import { DeleteNote } from "../use_cases/note/DeleteNote";
import { authenticate } from "../middlewares/authenticate";

// Instantiate your use cases with the repository
const noteRepository = new NoteRepository();
const createNoteUseCase = new CreateNote(noteRepository);
const getNoteUseCase = new GetNote(noteRepository);
const updateNoteUseCase = new UpdateNote(noteRepository);
const deleteNoteUseCase = new DeleteNote(noteRepository);

// Create the NoteController with the use cases
const noteController = new NoteController(
  createNoteUseCase,
  getNoteUseCase,
  updateNoteUseCase,
  deleteNoteUseCase
);

const router = Router();

// Use the controller methods directly as route handlers, wrapped with the authentication middleware
router.post("/notes", authenticate, (req: Request, res: Response) =>
  noteController.create(req, res)
);
router.get("/notes/:id", authenticate, (req: Request, res: Response) =>
  noteController.get(req, res)
);
router.get("/user-notes/:id", authenticate, (req: Request, res: Response) =>
  noteController.getByuserId(req, res)
);
router.put("/notes/:id", authenticate, (req: Request, res: Response) =>
  noteController.update(req, res)
);
router.delete("/notes/:id", authenticate, (req: Request, res: Response) =>
  noteController.delete(req, res)
);

export default router;
