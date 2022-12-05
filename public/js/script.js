$(function(){
    var navbar = $('.header-inner');
    $(window).scroll(function(){
        if($(window).scrollTop() <=40){
            navbar.removeClass('navbar-scroll');
        }else{
            navbar.addClass('navbar-scroll');
        }
    });
});



let slider = tns({
    container : ".my-slider",
    "slideBy" : "1",
    "speed" : 600,
    "nav" : false,
    autoplay: true,
    controls : false,
    autoplayButtonOutput : false,
    responsive: {
        1600: {
            items: 7,
            gutter: 30
        },
        1024: {
            items: 7,
            gutter: 30
        },
        768: {
            items: 7,
            gutter: 30
        },
        345: {
            items: 7,
            gutter: 30
        },
    }
})