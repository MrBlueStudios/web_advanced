const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function oldschoolAJAX() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.saxion.nl', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // ReadyState 4 means the request is done
            if (xhr.status === 200) { // Status 200 is a successful return
                console.log(xhr.responseText);
            } else {
                console.error(`Error: ${xhr.status}`);
            }
        }
    };
    xhr.send();
}

oldschoolAJAX();
