// Набор типов для типизации ответа сервера

export interface IOkWithData<T> {
    status: "ok",
    data: T
}
export interface IError {
    status: "error",
    message: string
}

export type Response<T> = IOkWithData<T> | IError
