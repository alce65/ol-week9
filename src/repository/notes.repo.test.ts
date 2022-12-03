import { NotesRepo } from './notes.repo';

test('should first', () => {
    const repo = new NotesRepo();
    const r = repo.load();
    console.log(r);
    expect(r).toBeInstanceOf(Promise);
});
