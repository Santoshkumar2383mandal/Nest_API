import { IsOptional, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for updating an existing item
 * All fields are optional (partial update)
 */
export class UpdateItemDto {
  /**
   * Optional updated title
   * Validation: String with minimum 2 characters if provided
   */
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  /**
   * Optional updated description
   * Validation: String if provided
   */
  @IsOptional()
  @IsString()
  description?: string;
}
