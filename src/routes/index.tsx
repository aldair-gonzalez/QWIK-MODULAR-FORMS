import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      Mi app
    </>
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
