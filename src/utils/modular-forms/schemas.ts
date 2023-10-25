import { email, minLength, object, string } from 'valibot';

export const LoginSchema = object({
  email: string([
    minLength(1, 'Por favor ingresa tu email'),
    email('La dirección de correo electrónico está mal formateada.')
  ]),
  password: string([
    minLength(1, 'Por favor ingresa tu contraseña'),
    minLength(8, 'La contraseña debe tener al menos 8 caracteres')
  ])
});
