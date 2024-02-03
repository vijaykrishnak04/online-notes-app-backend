import { Request, Response } from "express";
import { CreateNote } from "../use_cases/note/CreateNote";
import { GetNote } from "../use_cases/note/GetNote";
import { UpdateNote } from "../use_cases/note/UpdateNote";
import { DeleteNote } from "../use_cases/note/DeleteNote";

export  class NoteController {
  constructor(
    private createNote: CreateNote,
    private getNote: GetNote,
    private updateNote: UpdateNote,
    private deleteNote: DeleteNote
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
    
      const note = await this.createNote.execute(req.body);
      return res.status(201).json(note);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const note = await this.getNote.byId(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      } else {
        return res.status(200).json(note);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getByuserId(req: Request, res: Response): Promise<Response> {
    try {
      const note = await this.getNote.byUserId(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Notes not found" });
      } else {
        return res.status(200).json(note);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const note = await this.updateNote.execute(req.params.id, req.body);
      return res.status(200).json(note);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.deleteNote.execute(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
