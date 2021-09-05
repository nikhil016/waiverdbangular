import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import "rxjs";
import { environment } from './../environments/environment';
import { Observable } from "rxjs";
import { common } from "./common";
import { catchError } from "rxjs/operators";
import { waiverinfo } from "./WaiverInfo";

@Injectable()


export class waiverservice {
    private readonly baseURL;
  
    constructor(private http: HttpClient) {
        //    this.baseURL = "http://localhost:55745/api/";
           this.baseURL =  "http://slscbst.keysight.com/WaiverDBApi"
     }

     GetControl(control :any): Observable<any[]> {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        let params = new HttpParams();
        params = params.append('name', control);
        return this.http.get<any[]>(this.baseURL + 'GetControl', { params: params });
    }
    GetControlManager(control :any): Observable<any[]> {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        let params = new HttpParams();
        params = params.append('name', control);
        return this.http.get<common[]>(this.baseURL + 'GetManagerControl', { params: params });
    }

    SaveWaiverDB(control :any): Observable<any> {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post<any>(this.baseURL + '/SaveWaiverDB',control);  
    }
    GetWaiverInfo(WaiverID:any):Observable<waiverinfo>
    {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        let params = new HttpParams();
        params = params.append('waiver', WaiverID);
        return this.http.get<waiverinfo>(this.baseURL + 'GetWaiverInfo',{ params: params });  
    }
  
    SearchWaiver(WaiverID:any):Observable<any> 
    {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post<any>(this.baseURL + 'GetAllWaiver',WaiverID);  
    }

    DeleteRecord(WaiverID:any):Observable<any>
    {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        let params = new HttpParams();
        params = params.append('waiver', WaiverID);
        return this.http.get<waiverinfo>(this.baseURL + 'DeleteWaiver',{ params: params });   
    }

}