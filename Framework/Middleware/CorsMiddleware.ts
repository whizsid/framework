import { Inject, Injectable } from '../../Container';
import { MiddlewareInterface, RequestHandler } from '../../Router';
import { ErrorHandlerInterface, Request, Response } from '../../Http';

@Injectable()
export class CorsMiddleware implements MiddlewareInterface {

    @Inject()
    errorHandler: ErrorHandlerInterface;

    async handle(request: Request, next: RequestHandler) {
        let response: Response;
        if (request.method === 'OPTIONS') {
            // tslint:disable-next-line:no-any
            response = new Response<any>();
            response.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE';
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        } else {
            try {
                response = await next(request);
            } catch (error) {
                response = await this.errorHandler.handle(error, request);
            }
        }

        response.headers['Access-Control-Allow-Origin'] = '*';
        return response;
    }

}
