
import { isValidCPF, isValidEmail } from '../../utils/index'
import {  errorAlert } from '../../components/ToastifyAlerts'

export function registrationsValidate(data: any){
    if(!data.name){
        errorAlert('Nome é obrigatório')
        return false
    }
    if(!data.email){
        errorAlert('Email é obrigatório')
        return false
    }
    if(!isValidEmail(data.email)){
        errorAlert('Email inválido')
        return false
    }
    if(!data.cpf){
        errorAlert('Email é obrigatório')
        return false
    }
    if(!isValidCPF(data.cpf)){
        errorAlert('CPF inválido')
        return false
    }

   return true   
}
