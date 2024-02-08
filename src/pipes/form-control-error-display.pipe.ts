import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

type _ValidationErrors = {
  minlength: {
    requiredLength: number,
    actualLength: number
  }, 
  maxlength: {
    requiredLength: number,
    actualLength: number
  },
  max: {
    max: number,
    actual: number
  },
  min: {
    min: number,
    actual: number
  },
  required: true,
  isInteger: true
}

type ErrorMsgMap = {
  [key in keyof _ValidationErrors]: (err: _ValidationErrors[key]) => string;
};

@Pipe({
  name: 'validationErrorDisplay',
  standalone: true
})
export class ValidationErrorDisplayPipe implements PipeTransform {

  transform(value: ValidationErrors | null, label = 'value'): string {
    if (!value) return '';

    const entries = Object.entries(value);

    if (!entries.length) return '';

    const message: ErrorMsgMap = {
      minlength: e => `Min length ${e.requiredLength}`,
      maxlength: e => `Max length ${e.requiredLength}`,
      max: e => `Max ${e.max}`,
      min: e => `Min ${e.min}`,
      required: () => `Please enter ${label}`,
      isInteger: () => `Please input number`
    };

    const defaultMsg = 'Invalid value';

    return entries.map(k => (message as any)?.[k[0]]?.(k[1]) ?? defaultMsg)[0];
  }

}

