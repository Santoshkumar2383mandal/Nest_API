import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Data Transfer Object for user registration
 * Validates incoming registration data
 */
export class RegisterDto {
  /**
   * User's email address
   * Validation: Must be a valid email format
   */
  @IsEmail()
  email: string;

  /**
   * User's password
   * Validation: Required, minimum 6 characters
   * Will be hashed before storing in database
   */
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
