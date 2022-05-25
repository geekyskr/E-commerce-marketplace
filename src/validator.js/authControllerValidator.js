import { passwordStrength } from 'check-password-strength'

export function validateRequestForRegister(registerPayload) {
    if(!registerPayload.username){
        throw new Error("username is required in payload");
    } else if(!registerPayload.password){
        throw new Error("password is required in paylaod");
    } else if(passwordStrength(registerPayload.password).value != "Strong") {
        throw new Error("password is not Strong. Please include lowercase, uppercase, symbol, number and password length in two digit")
    } else if(!registerPayload.user_type){
        throw new Error("user_type is required in paylaod");
    } else if(registerPayload.user_type != "Buyer" && registerPayload.user_type != "Seller"){
        throw new Error("user_type must be Buyer or Seller");
    }
}

export function validateRequestForLogin(loginPayload) {
    if(!loginPayload.username){
        throw new Error("username is required in paylaod");
    } else if(!loginPayload.password){
        throw new Error("password is required in paylaod");
    }
}