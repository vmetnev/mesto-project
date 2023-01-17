function viewImage(evt) {
    console.log(evt.target.src)
    console.log(evt.target.alt)
    console.log('view')
    document.querySelector('.view').classList.add('view_opened')
    document.querySelector('.view__text').textContent = evt.target.alt
    document.querySelector('.view__image').src = evt.target.src
    document.querySelector('.view__close').addEventListener('click', viewClose)


    const viewImg = new Image()
    viewImg.src = evt.target.src

    console.log(viewImg.width)
    console.log(viewImg.height)


    function viewClose() {
        document.querySelector('.view__close').removeEventListener('click', viewClose)
        document.querySelector('.view').classList.remove('view_opened')
    }



}