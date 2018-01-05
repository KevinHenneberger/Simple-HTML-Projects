function validate() {
    return ($("#prime-number-1").val() != "" && $("#prime-number-2").val() != "" && $("#public-key-e").val() != "" && $("#public-key-2").val() != "" && $("#seed").val() != "");
}

function validation(element) {
    
    if ($("#" + element).val() != "") {
        $("#" + element + "-verification-1").removeClass("has-error").addClass("has-success");
        $("#" + element + "-verification-2").removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback");
    } else {
        $("#" + element + "-verification-1").removeClass("has-success").addClass("has-error");
        $("#" + element + "-verification-2").removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
    }
}

function showValidation() {
    
    validation("prime-number-1");
    validation("prime-number-2");
    validation("public-key-e");
    validation("public-key-2");
    validation("seed");
    
    if (validate()) {
        $("#confirmation").removeClass("hidden");
        $("#warning").addClass("hidden");
    } else {
        $("#confirmation").addClass("hidden");
        $("#warning").removeClass("hidden");
    }
}

extendedEuclideanAlgorithm = function(e, t) {
    
    if (t == 0) {
        return [1, 0];
    } 
    
    var temp = extendedEuclideanAlgorithm(t, e % t);
    var x = temp[0];
    var y = temp[1];
    
    return [y, x - y * Math.floor(e / t)];
}   

function modularPower(base, exponent, modulus) {
    
    var result = 1;

    while (exponent > 0) {
        
        if (exponent % 2 == 1) {
            result = (result * base) % modulus;
            exponent--;
        }
        
        exponent = exponent / 2;
        base = (base * base) % modulus;
    }
    
    return result;
}

function totient(p, q) {
    return (p - 1) * (q - 1);
}

function decrypt() {
    
    if (validate()) {

        var p = parseInt($("#prime-number-1").val(), 10);
        var q = parseInt($("#prime-number-2").val(), 10);
        var n = p * q;
        var t = totient(p, q);
        var e = parseInt($("#public-key-e").val(), 10);
        var d = t + extendedEuclideanAlgorithm(e, t)[0];
        var c = parseInt($("#seed").val(), 10);
        var m = modularPower(c, d, n);
        
        $("#output-text-seed").text("Decrypted Seed: " + m);
        $("#output").removeClass("hidden");
        
    } else {
        $("#output").addClass("hidden");
    }
}

$(document).ready(function() {
    $("#decrypt-button").click(function() {
        showValidation();
        decrypt();
    });
});
