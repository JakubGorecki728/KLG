import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static isInteger(): ValidatorFn {
        return (control: AbstractControl) : ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;
            
            const isInteger = /^\d+$/.test(value);
            return !isInteger ? { isInteger: true } : null;
        }
    }

}