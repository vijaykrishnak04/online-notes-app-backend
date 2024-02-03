import { INote } from '../../entities/Note';
import { INoteRepository } from '../../repositories/NoteRepository';

export class CreateNote {
  constructor(private noteRepository: INoteRepository) {}

  async execute(noteData: Partial<INote>): Promise<INote> {
    // Input validation (this can be more complex with proper validation rules)
    if (!noteData.title?.trim()) {
      throw new Error("Note title is required");
    }

    if (!noteData.content?.trim()) {
      throw new Error("Note content is required");
    }

    // The rest of the validation can be added here as necessary

    // Create a new note entity and persist it to the repository
  
    const note = await this.noteRepository.create(noteData);
    return note;
  }
}
