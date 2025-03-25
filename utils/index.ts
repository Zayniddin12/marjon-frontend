const validPhones = [
  '90',
  '91',
  '33',
  '50',
  '93',
  '94',
  '88',
  '95',
  '97',
  '98',
  '99',
  '77',
  '20',
]
export const isValidPhone = (val: string) => {
  const phone = val.replace(/[\s)(-]/g, '')
  return phone.length === 9 && validPhones.includes(phone.substring(0, 2))
}

export function formatMoneyDecimal(number: any, fix = 0, option = 'decimal') {
  let style: string
  if (['USD', 'RUB'].includes(option)) {
    style = 'currency'
  } else if (['kilogram', 'meter', 'percent'].includes(option)) {
    style = 'unit'
  } else {
    style = ''
  }

  const newStyle: string = style
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  }
  return number ? new Intl.NumberFormat('ru-RU', option2).format(number) : '0'
}

export function generateUniqueID() {
  const key = useCookie('key')
  if (!key.value) {
    key.value = '_' + Math.random().toString(36).substr(2, 9)
  }
  return key.value
}

export function formatNumberSpace(number: number, fix = 0) {
  return Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/,/g, ' ')
}

const timeouts: { [key: string]: any } = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}
export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {
        console.log(e)
      }

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export function formatDateRightOrder(date: string) {
  if (date) {
    const dateObj = date?.split('.')
    return `${dateObj[1]}.${dateObj[0]}.${dateObj[2]}`
  } else {
    return ''
  }
}

export function phoneNumberFormatter(number?: string) {
  const format = number
    ?.replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
  return `+${format && format[1] ? format[1] : ''} (${
    format && format[2] ? format[2] : ''
  }) ${format && format[3] ? format[3] : ''} ${
    format && format[4] ? format[4] : ''
  } ${format && format[5] ? format[5] : ''}`
}

export function generateHexColor() {
  // Generate a random integer between 0 and 16777215 (ffffff in hexadecimal)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  // Pad the random color with zeros to ensure it has 6 digits
  return '#' + randomColor.padStart(6, '0')
}

export function darkenHexColor(hexColor: string, factor = 0.6) {
  // Remove '#' if present
  hexColor = hexColor.replace('#', '')
  // Parse hex color to RGB components
  let r = parseInt(hexColor.substring(0, 2), 16)
  let g = parseInt(hexColor.substring(2, 4), 16)
  let b = parseInt(hexColor.substring(4, 6), 16)

  // Darken each RGB component
  r = Math.floor(r * factor)
  g = Math.floor(g * factor)
  b = Math.floor(b * factor)

  // Ensure each component stays within 0-255 range
  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  // Convert back to hex
  const darkHexColor =
    '#' +
    (r < 16 ? '0' : '') +
    r.toString(16) +
    (g < 16 ? '0' : '') +
    g.toString(16) +
    (b < 16 ? '0' : '') +
    b.toString(16)

  return darkHexColor
}

export function toEmbed(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  if (match && match[2].length === 11) {
    return `https://youtube.com/embed/${match[2]}`
  } else {
    return 'error'
  }
}
