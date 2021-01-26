const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с таким email не был найден",
  INVALID_PASSWORD: "Неверный пароль",
};

export function error<K extends keyof typeof ERROR_CODES>(code: K) {
  return ERROR_CODES[code] ?? "Неизвестная ошибка";
}
