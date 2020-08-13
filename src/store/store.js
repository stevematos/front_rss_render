import {writableSession} from './store-util';

export const user = writableSession('id', false);