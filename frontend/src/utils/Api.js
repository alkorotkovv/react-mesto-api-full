//Класс для формирования запросов к серверу
class Api {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
  };

  //Метод реакция на результат запроса
  _checkResult(res) {
    if (res.ok)
        return res.json()
      else
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  //Метод получения данных пользователя
  getUserInfo() {
    console.log("getUserInfo")
    console.log(localStorage.getItem('token'))
    return fetch(this._baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
    })
    .then(res => this._checkResult(res))
  };

  //Метод получения инициализируемых карточек
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };

  //Метод изменения данных пользователя
  setUserInfo(inputValuesObject) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${inputValuesObject.name}`,
        about: `${inputValuesObject.about}`
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод добавления новой карточки
  addCard(cardData) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${cardData.place}`,
        link: `${cardData.url}`
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод удаления карточки
  deleteCard(cardData) {
    return fetch(this._baseUrl + '/cards/' + cardData._id, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };

  //Метод установки/снятия лайка
  toggleLikeCard(cardData, isLiked) {
    let method = isLiked ? 'DELETE':'PUT';
    return fetch(this._baseUrl + '/cards/' + cardData._id + '/likes', {
      method: method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };

  //Метод установки аватара пользователя
  setUserAvatar(avatarData) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatarData.avatar}`
      })
    })
    .then(res => this._checkResult(res))
  };



}


const api = new Api({
  baseUrl: 'https://api.mesto.alkorotkovv.nomoredomains.club'
});

export default api;