import { MinLength, MaxLength, Matches, IsDateString, IsString } from 'class-validator';

export class CreateIndicatorDto {

  @IsString({message: 'Отправитель должен быть строковым типом'})
  sender: string;

  @IsString({message: 'Получатель должен быть строковым типом'})
  receiver: string;

  @MinLength(1, {message: 'Показатель должен содержать 4 цифры'})
  @MaxLength(5, {message: 'Показатель должен содержать не более 5 цифр'})
  @Matches(/^[1-9]+/, {message: 'Показатель не должен начинаться с 0'})
  indicator: string;

  @IsDateString({message: 'Неверный формат даты'})
  date: string;
}
