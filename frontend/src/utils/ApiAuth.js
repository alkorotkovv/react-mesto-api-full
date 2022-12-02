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
    .then(response => {
      try {
        if (response.status === 200){
          return response.json();
        }
        else if (response.status === 400)
          return ("Токен не передан или передан не в том формате");      
        else if (response.status === 401)
          return ("Переданный токен некорректен");
        else
        return ("Что-то пошло не так! Попробуйте ещё раз");
      } 
      catch(e){
        return (e)
      }
    })      
    .catch((err) => console.log(err));
  }; 
}


const apiAuth = new ApiAuth({
  baseUrl: 'https://mesto.alkorotkovv.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuth;