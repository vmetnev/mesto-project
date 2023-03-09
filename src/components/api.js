const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21/',
    headers: {
        authorization: '883b0527-2256-47ba-8282-90ca954558f2',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`ошибка ${res.status}`)
    }
}

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    }).then(checkResponse)
}

function updateProfile(obj) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(obj)
    }).then(checkResponse)
}

function updateAvatar(obj) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(obj)
    }).then(checkResponse)

}

function getAllCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    }).then(checkResponse)
}

function setLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    }).then(checkResponse)
}

function deleteLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse)
}

function addCard(obj) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(obj)
    }).then(checkResponse)
}

function removeCard(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse)
}


export {
    getProfileInfo,
    updateProfile,
    updateAvatar,
    getAllCards,
    setLike,
    deleteLike,
    addCard,
    removeCard
}