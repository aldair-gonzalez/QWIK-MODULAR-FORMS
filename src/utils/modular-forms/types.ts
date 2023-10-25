import type { Input } from 'valibot';
import type { LoginSchema } from './schemas';

export type LoginForm = Input<typeof LoginSchema>
