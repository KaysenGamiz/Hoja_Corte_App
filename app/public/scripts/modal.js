document.addEventListener('DOMContentLoaded', function(){
    var modalBg = document.querySelector('.modal-bg');
    var modalClose = document.querySelector('.modal-close');
    modalBg.classList.add('bg-active');

    modalClose.addEventListener('click', function() {
        modalBg.classList.remove('bg-active');
    });

});
