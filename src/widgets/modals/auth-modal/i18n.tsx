import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  toastError: {
    en: 'Something went wrong. Perhaps the link has already been sent to the specified mail',
    ru: 'Что-то пошло не так. Возможно ссылка уже была отправлена на указанную почту',
  },
  zodMinError: {
    en: 'field is required',
    ru: 'поле обязательно',
  },
  zodEmailError: {
    en: 'invalid email',
    ru: 'неверный формат почты',
  },
  title: {
    en: 'Sign in',
    ru: 'Вход',
  },
  emailPlaceholder: {
    en: 'email@exapmle.com',
    ru: 'почта@ya.ru',
  },
  emailSingIn: {
    en: 'Sign in with email',
    ru: 'Войти через Email',
  },
  googleSingIn: {
    en: 'Sign in with Google',
    ru: 'Войти через Google',
  },
  checkEmail: {
    ru: ({ emailProvidedByUser }: { emailProvidedByUser: string }) => (
      <div>
        проверьте почту <span className="underline">{emailProvidedByUser}</span>{' '}
        вам должна прийти ссылка для входа
      </div>
    ),
    en: ({ emailProvidedByUser }: { emailProvidedByUser: string }) => (
      <div>
        check your mail please{' '}
        <span className="underline">{emailProvidedByUser}</span> you should
        receive a login link
      </div>
    ),
  },
} as const)
