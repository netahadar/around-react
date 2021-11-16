const fetchCall = (url, headers) => {
    return fetch(url, headers)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        Promise.reject(`ERROR: ${res.statusText}`);
      })
  };
  
  class Api {
    constructor(baseUrl, headers) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    //Get user info from server:
    getUserInfo() {
      return fetchCall(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
    }
  
    //Update user avatar:
    setUserAvatar(data) {
      return fetchCall(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          //New avatar link:
          avatar: data.avatar,
        })
      });
    }

    //Get initial cards from server:
    getInitialCards() {
      return fetchCall(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
    }
  
    //Send new profile data to server:
    setUserInfo(obj) {
      return fetchCall(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          //New profile data:
          name: obj.name,
          about: obj.about,
        }),
      });
    }
  
    //Add new card:
    createNewCard(obj) {
      return fetchCall(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          //New card data:
          name: obj.name,
          link: obj.link,
        }),
      });
    }
  
    //Delete card:
    deleteCard(cardId) {
      return fetchCall(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  
    //Add like to card:
    _addLike(cardId) {
      return fetchCall(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      });
    }
  
    //Remove like from catd:
    _dislike(cardId) {
      return fetchCall(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
    }

    //toggle likes:
    changeLikeCardStatus(cardID, isLiked){
      if (isLiked){
        return this._dislike(cardID);
      } else {
        return this._addLike(cardID);
      }
    }
  }
  
  const api = new Api("https://around.nomoreparties.co/v1/group-12", {
    authorization: "12be1991-4f28-449f-a9a9-71d4704b25a2",
    "Content-Type": "application/json",
  });
  
  export default api;