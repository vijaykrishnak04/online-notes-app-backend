import { INote } from '../../entities/Note';
import { INoteRepository } from 'src/repositories/NoteRepository';

export class UpdateNote {
  constructor(private noteRepository: INoteRepository) {}

  async execute(noteId: string, noteData: Partial<INote>): Promise<INote | null> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    Object.assign(note, noteData);
    await this.noteRepository.update(noteId, noteData);

    return note;
  }
}