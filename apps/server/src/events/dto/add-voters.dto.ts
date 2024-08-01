import { IVoter } from 'types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEnum, IsString } from 'class-validator';

const contactMethods: IVoter['contactMethod'][] = ['sms', 'email'];

export class AddVotersDto {
    @ApiProperty({ type: 'string', enum: contactMethods })
    @IsEnum(contactMethods)
    contactMethod: IVoter['contactMethod'];

    @ApiProperty({})
    @IsArray({})
    @IsString({ each: true })
    @ArrayMinSize(1)
    contacts: IVoter['contactValue'][];
}
