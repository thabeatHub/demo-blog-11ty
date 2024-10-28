import axios from 'axios';

// ================
// Contact Scripts
// ================


const form = document.querySelector('form');
const modalForm = document.querySelector('#ContactFormModal');
const modalSuccess = document.querySelector('#modal-success');
const modalError = document.querySelector('#modal-error');
const modalSubmitButton = document.querySelector('#modal-submit-button');
if (form !== null){
    form.addEventListener('submit', handleForm, false);
}
if (modalForm !== null) {
    var myModalForm = new window.bootstrap.Modal(modalForm);
    //console.log("Form Acquired!")
}
if (modalSuccess !== null) {
    var myModalSuccess = new window.bootstrap.Modal(modalSuccess);
}
if (modalError !== null) {
    var myModalError = new window.bootstrap.Modal(modalError);
}
if (modalSubmitButton !== null) {
    modalSubmitButton.onclick = function (e) {
        console.log("Being Clicked!");
        handleForm(e);
    }

}
function handleForm(event) {
    event.preventDefault();
    form.classList.add("was-validated");
    if (form.checkValidity() === false) {
        console.log("Not valid Form!");
        event.stopPropagation();
    } else {
        
        console.log("Processing Form!");
        var formData = new FormData(form);
        formData.append('idForm', 'kapuaOps');
        console.log(formData.get('name'));
        console.log([...formData]);
        const message = {
            subject: '[CONTACTO] kapuaops.cloud',
            // title: 'This MAIL',
            // number: 117,
            msg: 'message' in event.target ? event.target.message.value : formData.get('message'),
            email: 'email' in event.target  ? event.target.email.value : formData.get('email'),
            name: 'name' in event.target ? event.target.name.value : formData.get('name'),
            destination: 'contact@kapuaops.cloud'
        }

        axios.defaults.headers.post['Content-Type'] = 'application/json'
        console.log("Going to send Message!");
        axios.post(
            'https://api.kapuaops.cloud/form-kapua',
            message
        )
            .then((response) => {
                console.log('Submit Success');
                if (modalForm !== null) myModalForm.hide();
                myModalSuccess.show();
                form.reset();
                form.classList.remove('was-validated')
                //window.location.href = '/contactsuccess';
            }).catch((e) => {
                console.log('Submit Fail:' + e);
                if (modalForm !== null) myModalForm.hide();
                myModalError.show();
                //window.location.href = '/contacterror';
            })

    } 
}

// ================
// Popover Scripts
// ================

const myPopoverTop = document.querySelector('#popover-top');
const myPopoverRight = document.querySelector('#popover-right');
const myPopoverBottom = document.querySelector('#popover-bottom');
const myPopoverLeft = document.querySelector('#popover-left');

if (myPopoverTop !== null) {
    var popoverTop = new window.bootstrap.Popover(myPopoverTop); 
    var popoverRight = new window.bootstrap.Popover(myPopoverRight);
    var popoverBottom = new window.bootstrap.Popover(myPopoverBottom);
    var popoverLeft = new window.bootstrap.Popover(myPopoverLeft);
}

// ================
// Carousel Scripts
// ================

var myCarousel = document.querySelector('#carousel');
if (myCarousel !== null) {
    var carousel = new window.bootstrap.Carousel(myCarousel);
    document.addEventListener('keyup', function(event) {
        if (event.keyCode == 39) {
            carousel.next();
        } 
        else if(event.keyCode == 37){
            carousel.prev();
        }        
    });
}

// ================
// Tooltip Scripts
// ================

const myTooltipTop = document.querySelector('#tooltip-top');
const myTooltipRight = document.querySelector('#tooltip-right');
const myTooltipBottom = document.querySelector('#tooltip-bottom');
const myTooltipLeft = document.querySelector('#tooltip-left');
const myTooltipHTML = document.querySelector('#tooltip-html');

if (myTooltipTop !== null) {
    var tooltipTop = new window.bootstrap.Tooltip(myTooltipTop);
    var tooltipRight = new window.bootstrap.Tooltip(myTooltipRight);
    var tooltipBottom = new window.bootstrap.Tooltip(myTooltipBottom);
    var tooltipLeft = new window.bootstrap.Tooltip(myTooltipLeft);
    var tooltipHTML = new window.bootstrap.Tooltip(myTooltipHTML);
}