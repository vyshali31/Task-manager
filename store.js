import { atom } from 'jotai';

// Authentication state
export const authAtom = atom(null);

// Task management atoms
export const taskListAtom = atom([]);
export const filterAtom = atom('all'); // filter: 'all', 'active', 'completed'

// Dark mode toggle
export const darkModeAtom = atom(false);
