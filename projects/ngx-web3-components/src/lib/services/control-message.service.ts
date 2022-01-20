export class ValidationControlMessageService {
  static getValidatorErrorMessage(validatorName: string): string {
    const config = {
      'required': 'This is Required Field.',
      'email': 'Your email must match this format (example@domain.com).',
      'wrongAddress': 'Please, enter a valid Wallet Address.'
    };

    return config[validatorName];
  }
}
