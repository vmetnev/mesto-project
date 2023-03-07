const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21/',
    headers: {
        authorization: '883b0527-2256-47ba-8282-90ca954558f2',
        'Content-Type': 'application/json'
    }
}

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })
}

function updateProfile(obj) {
    console.log(obj)

    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(obj)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })
}

function updateAvatar(obj) {
    console.log(obj)

    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(obj)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })

}

function getAllCards(){
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers        
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })
}

function setLike(id){
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers        
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })
}

function deleteLike(id){
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers        
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })
}

function addCard(obj){
    console.log(obj)

    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(obj)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`ошибка ${res.status}`)
        }
    })


}

export {
    getProfileInfo,
    updateProfile,
    updateAvatar,
    getAllCards,
    setLike,
    deleteLike,
    addCard
}