document.addEventListener("DOMContentLoaded", ()=>{

    const icons = document.querySelectorAll('.js-cross');
    console.log(icons)

    icons.forEach ((icon) => {
        console.log('go')
        icon.addEventListener('click', (event) => {
            icon.classList.toggle("open");
        });
    });

    document
        .querySelectorAll('.js-btn-menu')
        .forEach((btn)=> {
            btn.addEventListener('click', (event)=>{
                console.log(event)
                document.getElementById("myDropdown").classList.toggle("show");
            })
        })

    const slider = tns({
        "container": "#base",
        "items": 1,
        "slideBy": "page",
        "mouseDrag": true,
        "swipeAngle": false,
        "autoWidth": false,
        "speed": 400,
        "prevButton": ".prevButton",
        "nextButton": ".nextButton",
        "navPosition": "bottom",
        "gutter": 10,
        responsive: {
            320: {
                "prevButton": false,
                "nextButton": false,
                "nav": true,

            },
            769: {
                "nav": false,
            }
        }
    });
});