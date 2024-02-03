import { INoteRepository } from '../../repositories/NoteRepository';

export class DeleteNote {
  constructor(private noteRepository: INoteRepository) {}

  async execute(noteId: string): Promise<{ deleted: boolean; message?: string }> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    await this.noteRepository.delete(noteId);
    return { deleted: true, message: 'Note successfully deleted' };
  }
}


