class TokenService {
    getLocalAccessToken = () => localStorage.getItem('accessToken') ?? null

    getLocalRefreshToken = () => localStorage.getItem('refreshToken') ?? null

    setLocalAccessToken = (token) => localStorage.setItem('accessToken', token)

    setLocalRefreshToken = (token) =>
        localStorage.setItem('refreshToken', token)

    clearLocalTokens = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

}

export default new TokenService();