import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object for user login
 * Validates incoming login credentials
 */
export class LoginDto {
  /**
   * User's email address
   * Validation: Must be a valid email format
   */
  @IsEmail()
  email: string;

  /**
   * User's password
   * Validation: Required (no minimum length on login)
   */
  @IsNotEmpty()
  password: string;
}
