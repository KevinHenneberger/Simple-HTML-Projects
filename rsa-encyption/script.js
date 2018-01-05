function validate() {
    return ($("#public-key-n").val() != "" && $("#public-key-e").val() != "" && $("#seed").val() != "");
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
        
    validation("public-key-n");
    validation("public-key-e");
    validation("seed");
    
    if (validate()) {
        $("#confirmation").removeClass("hidden");
        $("#warning").addClass("hidden");
    } else {
        $("#confirmation").addClass("hidden");
        $("#warning").removeClass("hidden");
    }
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

function encrypt() {
    
    if (validate()) {
    
        var m = parseInt($("#seed").val(), 10);
        var n = parseInt($("#public-key-n").val(), 10);
        var e = parseInt($("#public-key-e").val(), 10);
        var c = modularPower(m, e, n);
        
        $("#output-text-seed").text("Encrypted Seed: " + c);
        $("#output").removeClass("hidden");
        
    } else {
        $("#output").addClass("hidden");
    }
}

$(document).ready(function() {
    $("#encrypt-button").click(function() {
        showValidation();
        encrypt();
    });
});
