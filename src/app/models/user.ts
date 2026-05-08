// ── Sign Up / Sign In ──────────────────────────────────────────────────────

export interface SignUpUser {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface LoggedUser {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  user?: LoggedUser;
  token?: string;
}

// ── Change Password ────────────────────────────────────────────────────────

export interface UpdatePassword {
  currentPassword: string;
  password: string;
  rePassword: string;
}

// ── Forgot Password flow ───────────────────────────────────────────────────

export interface ForgotPassword {
  email: string;
}

/**
 * POST /auth/forgotPasswords
 * 200 → { statusMsg: "success", message: "Reset code sent to your email" }
 */
export interface ForgotPasswordResponse {
  statusMsg: 'success' | 'fail';
  message: string;
}

/**
 * POST /auth/verifyResetCode
 * 200 → { status: "Success" }
 * 400 → { statusMsg: "fail", message: "Reset code is invalid or has expired" }
 */
export interface VerifyResetCodeResponse {
  status: string; // "Success"
}

export interface ResetCode {
  resetCode: string; // ← API expects "resetCode", NOT "code"
}

/**
 * PUT /auth/resetPassword
 * 200 → { token: "..." }
 * 400 → { statusMsg: "fail", message: "reset code not verified" }
 */
export interface ResetPassword {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  token: string;
}
