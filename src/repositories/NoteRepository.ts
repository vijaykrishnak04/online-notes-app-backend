import { Note, INote } from "../entities/Note";

export interface INoteRepository {
  create(noteData: Partial<INote>): Promise<INote>;
  findById(noteId: string): Promise<INote | null>;
  findByUserId(noteId: string): Promise<INote[] | null>;
  findAll(): Promise<INote[]>;
  update(noteId: string, noteData: Partial<INote>): Promise<INote | null>;
  delete(noteId: string): Promise<{ deleted: boolean; message?: string }>;
  // Other necessary methods...
}

export class NoteRepository implements INoteRepository {
  async create(noteData: Partial<INote>): Promise<INote> {
    const note = new Note(noteData);
    await note.save();
    return note;
  }

  async findById(noteId: string): Promise<INote | null> {
    return Note.findById(noteId);
  }

  async findByUserId(userId: string): Promise<INote[] | null> {
    return Note.find({ user: userId });
  }

  async findAll(): Promise<INote[]> {
    return Note.find();
  }

  async update(
    noteId: string,
    noteData: Partial<INote>
  ): Promise<INote | null> {
    const note = await this.findById(noteId);
    if (!note) {
      throw new Error("Note not found");
    }

    Object.assign(note, noteData);
    await note.save();
    return note;
  }

  async delete(
    noteId: string
  ): Promise<{ deleted: boolean; message?: string }> {
    const note = await this.findById(noteId);
    if (!note) {
      throw new Error("Note not found");
    }

    await note.deleteOne();
    return { deleted: true, message: "Note successfully deleted" };
  }

  // Implement other methods as required...
}
