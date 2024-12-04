export interface UserData {
    name: string;
    email: string;
    cpf:string;
    password: string;
    confirmPassword: string;
  }
  
  export interface FormErrors {
    name?: string;
    email?: string;
    cpf?:string;
    password?: string;
    confirmPassword?: string;
  }