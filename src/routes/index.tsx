import { $, component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler} from '@modular-forms/qwik';
import { reset, useForm, valiForm$ } from '@modular-forms/qwik';
import type { LoginForm} from '../utils/modular-forms/index';
import { LoginSchema, useFormAction } from '../utils/modular-forms/index';

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  password: '',
}));

export default component$(() => {
  const [ loginForm, { Form, Field } ] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema)
  });

  const handleSubmit = $<SubmitHandler<LoginForm>>(async (values, event) => {
    console.log(values);
    console.log(event.target);
    alert('Registro completado');
    reset(loginForm);
  });

  return (
    <Form
      onSubmit$={handleSubmit}
      class="flex flex-col gap-2 items-center justify-center"
      >
      <Field name="email">
        {(field, props) => (
          <div class="grid grid-cols-1 gap-1">
            <label
              for="email"
              class="text-sm text-medium uppercase"
              >
              email
            </label>
            <input
              {...props}
              type="email"
              value={field.value}
              class="w-80 px-2 py-1 rounded-md border"
              />
            {
              field.error &&
                <div class="text-red-500 text-sm">
                  * {field.error}
                </div>
            }
          </div>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <div class="grid grid-cols-1 gap-1">
            <label
              for="password"
              class="text-sm text-medium uppercase"
              >
              password
            </label>
            <input
              {...props}
              type="password"
              value={field.value}
              class="w-80 px-2 py-1 rounded-md border"
              />
            {
              field.error &&
                <div class="text-red-500 text-sm">
                  * {field.error}
                </div>
            }
          </div>
        )}
      </Field>
      <button
        type="submit"
        class="bg-sky-500 text-white rounded-md w-full px-4 py-2 text-center text-sm font-medium uppercase"
        >
        Login
      </button>
    </Form>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Modular Forms',
  meta: [
    {
      name: 'description',
      content: 'Aplicando modular-forms en una app de qwik.',
    },
  ],
};
