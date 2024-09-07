$(document).ready(function(){
     var regiones=[];
     $.getJSON('/Registrarse/datos/regiones.json',function(datos){
         regiones=datos;
         datos.forEach(elemento => {
            $("#region").append(`<option>${elemento.nombre}</option>`);
         });
     });
    $("#region").on("change",function(e){
        $("#comuna").find('option').remove().end();
        var region = $(this).children("option:selected").val();
        if(region!==""){
            regiones.forEach(elemento=>{
                if(elemento.nombre==region){
                    $("#comuna").append("<option></option>");
                    elemento.comunas.forEach(comuna=>{
                        $("#comuna").append(`<option>${comuna}</option>`);
                    });
                }
            })
        }
    });
    $( ".validacion" ).validate( {
        errorClass: "is-invalid",
        validClass: "is-valid",
        rules: {
            usuario: {
                required: true,
            },
            rut:{
                required:true,
                validacionRUT:true
            },
            email: {
                required: true,
            },
            password:{
                required: true,
                pwcheck: true,
                minlength: 8
            },
            repassword:{
                required: true,
                equalTo: password
            },
            comuna:{
                required:true
            },
            region:{
                required: true
            },
            terminos:{
                required: true
            }

        },
        messages:{
            usuario: {
                required: "Se requiere Usuario"
            },
            rut:{
                required: "Se requiere Rut",
                validacionRUT:"No tiene el formato de rut (8-7 digitos, sin puntos, con guion)"
            },
            email:{
                required: "Se requiere correo",
                email: "Formato de correo incorrecto"
            },
            password:{
                required: "Se requiere contraseña",
                pwcheck: "La contraseña no cumple con las condiciones(al menos: un digito, una minuscula, una mayuscula y sin espacio)",
                minlength: "Debe contener al menos 8 caracteres"
            }, 
            repassword:{
                required: "Se requiere confirmacion de contraseña",
                equalTo: "No son identicas"
            },
            region:{
                required:"La región es requerida"
            },
            comuna:{
                required: "La comuna es requerida"
            },
            terminos:{
                required: "Se requiere aceptar los términos y condiciones"
            }
        }
    });
    $.validator.addMethod("pwcheck",
                        function(value, element) {
                            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value);
    });
    $.validator.addMethod("validacionRUT",
                        function(value, element) {
                            return /^\d{7,8}-[k|K|\d]{1}$/.test(value);
    });
});

