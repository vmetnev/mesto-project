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


export {
    getProfileInfo,
    updateProfile,
    updateAvatar,
    getAllCards
}