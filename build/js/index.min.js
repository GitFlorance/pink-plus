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
});