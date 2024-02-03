import { INote } from '../../entities/Note';
import { INoteRepository } from '../../repositories/NoteRepository';

export class GetNote {
  constructor(private noteRepository: INoteRepository) {}

  async byId(noteId: string): Promise<INote | null> {
    return await this.noteRepository.findById(noteId);
  }

  async byUserId(userId: string): Promise<INote[] | null> {
    return await this.noteRepository.findByUserId(userId);
  }

  // Add more methods to retrieve notes in different ways, ensuring they use the injected repository.
}

