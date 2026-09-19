// Утилиты для работы с датами и временем.
// Сервер всегда работает в UTC: строки дат/времени от сервера считаем UTC,
// а при отправке на сервер конвертируем время пользователя в UTC.

const TIMEZONE_DESIGNATOR_REGEX = /Z$|[+-]\d{2}:?\d{2}$/

export const convertUTCToLocal = (utcDateString: string): Date => {
  // Дата без времени (например "2026-09-19") — это конкретный календарный день,
  // а не момент времени, поэтому конвертировать часовой пояс не нужно.
  if (!utcDateString.includes("T")) {
    const [year, month, day] = utcDateString.split("-").map(Number)
    return new Date(year, month - 1, day)
  }

  // Если сервер не указал часовой пояс явно, считаем строку UTC:
  // без этого браузер интерпретирует её как локальное время.
  const hasTimezone = TIMEZONE_DESIGNATOR_REGEX.test(utcDateString)
  const normalized = hasTimezone ? utcDateString : `${utcDateString}Z`

  // new Date() хранит момент времени в абсолютном виде, поэтому все геттеры
  // (getDate, getMonth, toLocaleDateString и т.д.) уже вернут локальное время пользователя.
  return new Date(normalized)
}

// Конвертирует локальную дату/время пользователя в строку UTC для отправки на сервер
export const convertLocalToUTC = (date: Date): string => date.toISOString()

export const formatDateForLocale = (
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === "string" ? convertUTCToLocal(date) : date

  const localeMap = {
    en: "en-US",
    th: "th-TH",
    ru: "ru-RU",
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }

  return dateObj.toLocaleDateString(localeMap[locale as keyof typeof localeMap] || "ru-RU", defaultOptions)
}

export const formatDateTimeForLocale = (
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === "string" ? convertUTCToLocal(date) : date

  const localeMap = {
    en: "en-US",
    th: "th-TH",
    ru: "ru-RU",
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  }

  return dateObj.toLocaleDateString(localeMap[locale as keyof typeof localeMap] || "ru-RU", defaultOptions)
}

export const getLocalDateString = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? convertUTCToLocal(date) : date

  // Формируем YYYY-MM-DD из локальных компонентов даты.
  // toISOString() тут не подходит: он всегда возвращает UTC-дату,
  // которая может отличаться от локального календарного дня.
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, "0")
  const day = String(dateObj.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === "string" ? convertUTCToLocal(date1) : date1
  const d2 = typeof date2 === "string" ? convertUTCToLocal(date2) : date2

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export const isSameMonth = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === "string" ? convertUTCToLocal(date1) : date1
  const d2 = typeof date2 === "string" ? convertUTCToLocal(date2) : date2

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
}
