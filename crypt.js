var input = null;
var key = null;
var output = null;

document.addEventListener("DOMContentLoaded", function() {
    input = document.querySelector("#input");
    key = document.querySelector("#key");
    output = document.querySelector("#output");
});

// make a function that triggers when a file is uploaded
function uploadFile() {
    // get the file from file input
    var file = document.querySelector("#file-input").files[0];

    // load the file into input textarea
    var reader = new FileReader();
    reader.onload = function() {
        input.value = reader.result;
    }

    reader.readAsText(file);
}

function encrypt() {
    const inputText = input.value;
    const keyText = key.value;

    if(inputText.length == 0 || keyText.length == 0) {
        alert("Please enter a value for both input and key.");
        return;
    }
    
    const encrypted = encryptText(inputText, keyText);

    output.value = encrypted;
}

function decrypt() {
    const inputText = input.value;
    const keyText = key.value;

    if(inputText.length == 0 || keyText.length == 0) {
        alert("Please enter a value for both input and key.");
        return;
    }
    
    const decrypted = decryptText(inputText, keyText);

    output.value = decrypted;
}

function encryptText(input, key) {
    var encrypted = "";

    encrypted = CaesarCipher(input, 3);
    encrypted = VigenereCipher(encrypted, key);
    encrypted = XORCipher(encrypted, key);

    return encrypted;
}

function decryptText(input, key) {
    var decrypted = input;

    decrypted = XORCipher(decrypted, key);
    decrypted = VignereSolver(decrypted, key);
    decrypted = CaesarCipher(decrypted, -3);

    return decrypted;
}

// Cyphers
function CaesarCipher(str, shift) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let charValue = str.charCodeAt(i);
        charValue += shift;
        result += String.fromCharCode(charValue);
    }
    return result;
}

function VigenereCipher(str, key)
{
    var result = "";
    for (var i = 0; i < str.length; i++)
    {
        var charValue = str.charCodeAt(i) + key.charCodeAt(i % key.length);
        result += String.fromCharCode(charValue);
    }

    return result;
}

function XORCipher(str, key) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let charValue = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charValue);
    }

    return result;
}

function VignereSolver(str, key) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        var charValue = str.charCodeAt(i) - key.charCodeAt(i % key.length);
        result += String.fromCharCode(charValue);
    }

    return result;
}