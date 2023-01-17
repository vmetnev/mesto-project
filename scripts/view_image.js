function viewImage(evt) {

    document.querySelector('.view').classList.add('view_opened')
    document.querySelector('.view').classList.remove('view_fadeout')
    document.querySelector('.view').classList.add('view_fadein')



    document.querySelector('.view__text').textContent = evt.target.alt
    document.querySelector('.view__image').src = evt.target.src
    document.querySelector('.view__close').addEventListener('click', viewClose)


    const viewImg = new Image()
    viewImg.src = evt.target.src




    function viewClose() {
        document.querySelector('.view__close').removeEventListener('click', viewClose)


        document.querySelector('.view').classList.remove('view_fadein')
        document.querySelector('.view').classList.add('view_fadeout')
        setTimeout(function () {
            document.querySelector('.view').classList.remove('view_opened')
        }, 400)


    }

}