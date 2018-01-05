function validate() {
    return ($("#input-field").val() != "");
}

function showValidation() {
    
    if (validate()) {
        $("#confirmation").removeClass("hidden");
        $("#warning").addClass("hidden");
    } else {
        $("#confirmation").addClass("hidden");
        $("#warning").removeClass("hidden");
    }
}

function minify(input) {
    return input.replace(/\s+/g, " ").trim();
}

function randomKey(low, high) {
    var range = high - low;
    return Math.floor(Math.random() * range) + low;
}

function generateRandomSequence(seed, length) {
    
    var m = 512;
    var a = 17;
    var c = 7;
    
    var randomSequence = [];
    
    while (randomSequence.length < length) {
        
        var xn = seed;

        if (randomSequence.length >= 1) {
            xn = randomSequence[randomSequence.length - 1];
        }
        randomSequence.push((a * xn + c) % m);
    }
    
    return randomSequence;
}

function encryptUsingOneTimePad() {
    
    if (validate()) {
    
        var rawInput = $("#input-field").val();
        var input = minify(rawInput);
        var key = randomKey(0, 1000000);
        var randomSequence = generateRandomSequence(key, input.length);
        var encryptedInput = [];
    
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            var randomDigit = randomSequence[i];
            var encryptedChar = charCode + randomDigit;
            encryptedInput.push(encryptedChar);
        }
            
        $("#output").removeClass("hidden");
        $("#output-text-seed").text("Seed: " + key);
        $("#output-text-encrypted-data").text("Encrypted Input: " + encryptedInput.join(", "));
        
    } else {
        $("#output").addClass("hidden");
    }
}

$(document).ready(function() {
    $("#encrypt-button").click(function() {
        showValidation();
        encryptUsingOneTimePad();
    });
});
