const checkboxes = document.querySelectorAll('.inbox input[type = "checkbox"]');
let lastChecked;
function handleCheck(e){
    let inBetween = false;
    if(this.checked && e.shiftKey){
        checkboxes.forEach(box => {
            if(box === this || box === lastChecked){
                inBetween = !inBetween;
            };

            if(inBetween){
                box.checked = true;
            }
        });
    }
    lastChecked = this;
};
checkboxes.forEach(box =>{
    box.addEventListener('click',handleCheck);
});
