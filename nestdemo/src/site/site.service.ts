import { Inject, Injectable, Optional } from '@nestjs/common';

@Injectable()
export class SiteService<T> {
    @Optional()
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T;
}
