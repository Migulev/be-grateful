export class SupabaseError extends Error {
  constructor(message = 'ошибка при работе с базой данных') {
    super(message)
    this.name = 'SupabaseError'
  }
}

export class UserCancelationError extends Error {
  constructor(message = 'пользователь отменил действие') {
    super(message)
    this.name = 'UserCancelationError'
  }
}

export class ValidationError extends Error {
  constructor(message = 'неверные данные') {
    super(message)
    this.name = 'ValidationError'
  }
}
