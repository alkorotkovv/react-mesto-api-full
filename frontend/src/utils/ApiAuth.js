//Класс для формирования запросов к серверу для аутентификации
class ApiAuth {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  //Метод реакция на результат запроса
  _checkResult(res) {
    if (res.ok)
        return res.json()
      else
        return Promise.reject(res.json());
  };

  //Метод регистрации пользователя
  registerUser(email, password) {
    return fetch(this._baseUrl + '/signup', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`
    })
    })
    .then(res => this._checkResult(res));
  };

  //Метод логина пользователя
  loginUser(email, password) {
    return fetch(this._baseUrl + '/signin', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`
    })
    })
    .then(res => this._checkResult(res));
  }; 

  //Метод проверки токена пользователя
  getUserByToken(token) {
    return fetch(this._baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
    })
    .then(res => this._checkResult(res));
  }; 
}


const apiAuth = new ApiAuth({
  baseUrl: 'http://api.mesto.alkorotkovv.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuth;