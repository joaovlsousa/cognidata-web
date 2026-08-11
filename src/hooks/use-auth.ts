import Cookies from 'js-cookie'

export function useAuth() {
  function saveToken(token: string) {
    Cookies.set('token', token, {
      path: '/',
      expires: 7,
    })
  }

  function clearToken() {
    Cookies.remove('token', {
      path: '/',
    })
  }

  const token = Cookies.get('token') ? Cookies.get('token') : null

  return {
    token,
    saveToken,
    clearToken,
  }
}
