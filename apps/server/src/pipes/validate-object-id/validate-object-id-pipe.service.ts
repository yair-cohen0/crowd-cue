import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string, string> {
    transform(value: string) {
        const validObjectId = Types.ObjectId.isValid(value);

        if (!validObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }

        return value;
    }
}
