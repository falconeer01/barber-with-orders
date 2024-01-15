import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataResponse } from "../../models/responses";
import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export abstract class BaseService<T>{
    path:string=''
    constructor(private httpClient:HttpClient){}

    get getHttpClient():HttpClient{
      return this.httpClient;
    }

    getAll():Observable<DataResponse<T[]>>{
      return this.httpClient.get<DataResponse<T[]>>(environment.getApiUrl(`/${this.path}/get-all`))
    }

    getAllDeleted():Observable<DataResponse<T[]>>{
      return this.httpClient.get<DataResponse<T[]>>(environment.getApiUrl(`/${this.path}/get-all-deleted`))
    }

    getAllNotDeleted():Observable<DataResponse<T[]>>{
      return this.httpClient.get<DataResponse<T[]>>(environment.getApiUrl(`/${this.path}/get-all-not-deleted`))
    }

    getById(id:number):Observable<DataResponse<T>>{
      return this.httpClient.get<DataResponse<T>>(environment.getApiUrl(`/${this.path}/get-by-id/`+id));
    }

    create(entity:T|any):Observable<Response>{
      return this.httpClient.post<Response>(environment.getApiUrl(`/${this.path}/create`),entity);
  }

    update(entity:T):Observable<Response>{
      return this.httpClient.post<Response>(environment.getApiUrl(`/${this.path}/update`),entity);
    }

    deleteById(userId:number):Observable<Response>{
      return this.httpClient.delete<Response>(environment.getApiUrl(`/${this.path}/delete-by-id/`+userId));
    }

    hardDeleteById(id:number):Observable<Response>{
      return this.httpClient.delete<Response>(environment.getApiUrl(`/${this.path}/hard-delete-by-id/`+id));
    }

    restoreById(id:number):Observable<Response>{
      return this.httpClient.get<Response>(environment.getApiUrl(`/${this.path}/restore-by-id/`+id));
    }
}
