class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this.nameElement = document.querySelector(userNameSelector);
    this.jobElement = document.querySelector(userAboutSelector);
    this.avatar = document.querySelector(userAvatarSelector);
    this.userId;
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.jobElement.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = about;
    this.avatar.src = avatar;
    this.avatar.alt = name
    this._id = _id
  }
}

export { UserInfo }

