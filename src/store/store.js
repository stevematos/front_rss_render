import {writableSession} from './store-util';
import { writable } from 'svelte/store';

export const user = writableSession('id', false);
export const register = writable(false)