import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(async (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.token;
});
