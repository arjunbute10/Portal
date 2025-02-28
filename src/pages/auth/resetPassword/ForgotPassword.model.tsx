export interface ForgotPasswordData {
    userName: string,
}

export interface CreateNewPassword {
    otp: string,
    newPassword: string,
    confirmPassword: string,
}

