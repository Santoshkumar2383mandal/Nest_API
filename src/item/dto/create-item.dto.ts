import { IsOptional, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for creating a new item
 * Validates incoming item creation data
 */
export class CreateItemDto {
  /**
   * Title of the item
   * Validation: Required string, minimum 2 characters
   */
  @IsString()
  @MinLength(2)
  title: string;

  /**
   * Optional description of the item
   * Validation: String if provided
   */
  @IsOptional()
  @IsString()
  description?: string;
}
