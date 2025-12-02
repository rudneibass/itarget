import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '@src/account/infra/exceptions/domain.exception';

@Catch()
export class GlobalExceptionCatcher implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionCatcher.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let layer = 'unknown';
    let sublayer: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const resp = exception.getResponse();
      message = typeof resp === 'string' ? resp : (resp as any).message ?? resp;
    } else if (exception instanceof DomainException) {
      status = exception.statusCode ?? HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
      layer = exception.layer;
    } else {
      message = (exception as any)?.message ?? message;
      layer = (exception as any)?.layer ?? detectLayerFromStack((exception as any)?.stack);
      sublayer = (exception as any)?.sublayer;
    }

    this.logger.error({ message, layer, sublayer, exception });

    const body: any = {
      message,
      status,
      layer,
      path: request.url,
      timestamp: new Date().toISOString(),
    };
    
    if (process.env.NODE_ENV !== 'production') {
      body.stack = (exception as any)?.stack;
    }

    response.status(status).json(body);
  }
}

function detectLayerFromStack(stack?: string): string {
  if (!stack) return 'unknown';
  if (stack.includes('/domain/') || stack.includes('\\domain\\')) return 'domain';
  if (stack.includes('/infra/') || stack.includes('\\infra\\')) return 'infra';
  if (stack.includes('/repository/') || stack.includes('\\repository\\')) return 'repository';
  if (stack.includes('/service/') || stack.includes('\\service\\')) return 'service';
  if (stack.includes('/controllers/') || stack.includes('\\controllers\\')) return 'controller';
  return 'unknown';
}
