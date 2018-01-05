function validate() {
    return ($("#seed").val() != "");
}

function showValidation() {
    
    if ($("#seed").val() != "") {
        $("#seed-verification-1").removeClass("has-error").addClass("has-success");
        $("#seed-verification-2").removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback");
    } else {
        $("#seed-verification-1").removeClass("has-success").addClass("has-error");
        $("#seed-verification-2").removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
    }
    
    if (validate()) {
        $("#confirmation").removeClass("hidden");
        $("#warning").addClass("hidden");
    } else {
        $("#confirmation").addClass("hidden");
        $("#warning").removeClass("hidden");
    }
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

function decryptUsingOneTimePad() {
    
    if (validate()) {
    
        var rawInput = $("#input-field").val();
        var input = rawInput.split(", ");
        var key = $("#seed").val();
        var randomSequence = generateRandomSequence(key, input.length);
        var decryptedInput = [];
    
        for (var i = 0; i < input.length; i++) {
            var encryptedChar = input[i];
            var randomDigit = randomSequence[i];
            var decryptedChar = String.fromCharCode(encryptedChar - randomDigit);
            decryptedInput.push(decryptedChar);
        }
            
        $("#output-text").text("Decrypted Input: " + decryptedInput.join(""));
        $("#output").removeClass("hidden");
        
    } else {
        $("#output").addClass("hidden");
    }
}

$(document).ready(function() {
    $("#decrypt-button").click(function() {
        showValidation();
        decryptUsingOneTimePad();
    });
});
