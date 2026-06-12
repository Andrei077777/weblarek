import { IApi, ApiPostMethods } from '../../types/index.ts';

export class Api implements IApi {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    async get<T extends object | undefined>(uri: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${uri}`, {
            ...this.options,
            method: 'GET',
        });
        return this.handleResponse<T>(response);
    }

    async post<T extends object | void>(
        uri: string,
        data: object,
        method: ApiPostMethods = ApiPostMethods.POST
    ): Promise<T> {
        const response = await fetch(`${this.baseUrl}${uri}`, {
            ...this.options,
            method,
            body: JSON.stringify(data),
        });
        return this.handleResponse<T>(response);
    }

    protected async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            // Сервер часто кладёт пояснение ошибки в тело ответа
            const data = await response.json().catch(() => null);
            throw new Error(data?.error ?? `Ошибка ${response.status}: ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }
}
