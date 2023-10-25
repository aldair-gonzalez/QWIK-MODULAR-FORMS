import { formAction$, valiForm$ } from '@modular-forms/qwik';
import type { LoginForm } from './types';
import { LoginSchema } from './schemas';

export const useFormAction = formAction$<LoginForm>(() => {}, valiForm$(LoginSchema));
