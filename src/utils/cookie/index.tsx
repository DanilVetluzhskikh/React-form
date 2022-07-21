type OptionsType = {
  [key: string]: string | Date | number
}

export const setCookie = (name: string, value: string, options: OptionsType) => {
  options = {
    path: '/',
    ...options
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey
    let optionValue = options[optionKey]
    updatedCookie += '=' + optionValue
  }

  document.cookie = updatedCookie
}

export const deleteCookie = (name: string) => {
  setCookie(name, '', { 'max-age': -1 })
}

export const getCookie = (name: string) => {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}
