document.addEventListener('DOMContentLoaded', function(){
    var modalBg = document.querySelector('.modal-bg');
    var modalSend = document.querySelector('.modal-send');
    modalBg.classList.add('bg-active');

    modalSend.addEventListener('click', function() {
        modalBg.classList.remove('bg-active');
    });

});
