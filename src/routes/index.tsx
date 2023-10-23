import { $, component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { SubmitHandler } from '@modular-forms/qwik';
import { useForm, type InitialValues, valiForm$, formAction$ } from '@modular-forms/qwik';
import type { Input } from 'valibot';
import { email, minLength, object, string } from 'valibot';

const LoginSchema = object({
  email: string([
    minLength(1, 'Please enter your email.'),
    email('The email address is badly formatted.'),
  ]),
  password: string([
    minLength(1, 'Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.'),
  ]),
});

type LoginForm = Input<typeof LoginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  password: '',
}));

export const useFormAction = formAction$<LoginForm>(() => {}, valiForm$(LoginSchema));

export default component$(() => {
  const [loginForm, { Form, Field, FieldArray }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });

  const handleSubmit = $<SubmitHandler<LoginForm>>((values, event) => {
    loginForm.element?.reset();
    alert('Login success');
  });

  return (
    <Form onSubmit$={handleSubmit} class="flex flex-col items-center justify-center gap-4">
      <Field name="email">
        {(field, props) => (
          <div class="w-80 grid grid-cols-1 gap-1">
            <label class="text-sm" for="email">
              {
                field.error &&
                <span class="text-red-500">* </span>
              }
              Email
            </label>
            <input class="w-full border rounded-md py-1 px-3" {...props} type="email" value={field.value} />
            { field.error &&
              <div class="text-red-500 text-sm">{field.error}</div>
            }
          </div>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <div class="w-80 grid grid-cols-1 gap-1">
            <label class="text-sm" for="password">
              {
                field.error &&
                <span class="text-red-500">* </span>
              }
              Password
            </label>
            <input class="w-full border rounded-md py-1 px-3" {...props} type="password" value={field.value} />
            { field.error &&
              <div class="text-red-500 text-sm">{field.error}</div>
            }
          </div>
        )}
      </Field>
      <button class="bg-sky-500 text-white rounded-md py-2 px-4 w-full uppercase font-medium text-sm transition-transform ease-linear duration-100 active:scale-95" type="submit">iniciar sesión</button>
    </Form>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Modular Forms',
  meta: [
    {
      name: 'description',
      content: 'Implementando la librería modular-forms a una app Qwik',
    },
  ],
};
