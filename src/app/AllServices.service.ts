import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AllServices {
  baseUrl = environment.BaseURL;

  constructor(private http: HttpClient) {}

  /**
   * Eng / Tarek Ahmed Ramadan
   * Function name : GetMethod
   * Function purpose : Get All added elements in the database
   * Needed Parameters :-
   * 1- end point name for the called api
   * 2- pramas parameter which is will be optional parameter
   */
  GetMethod(Api_Name: any, params?: any) {
    if (!params) {
      return this.http.get(this.baseUrl + Api_Name);
    } else {
      return this.http.get(this.baseUrl + Api_Name + "/" + params);
    }
  }
  GetMethodWithPipe(Api_Name: any, params?: any, queryPrams?: any) {
    if (!params) {
      return this.http.get(this.baseUrl + Api_Name).pipe(
        map((data: any) => {
          return data.data.length > 0 ? data.data : [];
        }),
        catchError((error) => {
          if (error.code == 500) {
            return throwError("server error check your network error");
          } else if (error.code == 400) {
            return throwError("bad request error");
          } else if (error.code == 401) {
            return throwError("check authientication");
          } else {
            return throwError("error happen");
          }
        })
      );
    }

    //here is the condition needed if the called get method api has to get specific data with a selected row
    else {
      if (!queryPrams) {
        return this.http.get(this.baseUrl + Api_Name + "/" + params).pipe(
          map((data: any) => {
            return data.data.length > 0 ? data.data : [];
          }),
          catchError((error) => {
            if (error.code == 500) {
              return throwError("server error check your network error");
            } else if (error.code == 400) {
              return throwError("bad request error");
            } else if (error.code == 401) {
              return throwError("check authientication");
            } else {
              return throwError("error happen");
            }
          })
        );
      } else {
        return this.http
          .get(this.baseUrl + Api_Name + "?id=" + queryPrams)
          .pipe(
            map((data: any) => {
              return data.data.length > 0 ? data.data : [];
            }),
            catchError((error) => {
              if (error.code == 500) {
                return throwError("server error check your network error");
              } else if (error.code == 400) {
                return throwError("bad request error");
              } else if (error.code == 401) {
                return throwError("check authientication");
              } else {
                return throwError("error happen");
              }
            })
          );
      }
    }
  }

  /**
   * Eng / Tarek Ahmed Ramadan
   * Function purpose : Post All new data to the database
   * Function name : PostMethod
   * Needed Parameters :-
   * 1- Api_name : end point name for the called api
   * 2- body :  parameter which is the designed model to affect row in the database
   */
  PostMethod(Api_name: any, body: any) {
    return this.http.post(this.baseUrl + Api_name, body);
  }

  PostMethodWithPipe(Api_name: any, body: any) {
    return this.http.post(this.baseUrl + Api_name, body).pipe(
      catchError((error) => {
        if (error.code == 500) {
          return throwError("server error check your network error");
        } else if (error.code == 400) {
          return throwError("bad request");
        } else {
          return throwError("error happen");
        }
      })
    );
  }

  // //here is the function needed for login
  // Login(username : any , password : any)
  // {
  //   return this.http.post(`${this.baseUrl}/Users/Login/${username}/${password}`)
  // }

  /**
   * Eng / Tarek Ahmed Ramadan
   * Function purpose : Delete a selected row form the database
   * Function name : DeleteMethod
   * Needed Parameters :-
   * 1- Api_name : end point name for the called api
   * 2- params :  parameter which is will be needed to select the needed id of the selected row needed for delete
   */
  DeleteMethod(Api_name: any, params: any) {
    return this.http.delete(this.baseUrl + Api_name + "/" + params);
  }
  DeleteMethodWithPipe(Api_name: any, params: any) {
    return this.http.delete(this.baseUrl + Api_name + "/" + params).pipe(
      catchError((error) => {
        if (error.code == 500) {
          return throwError("server error check your network error");
        } else if (error.code == 400) {
          return throwError("bad request");
        } else {
          return throwError("error happen");
        }
      })
    );
  }

  /**
   * Eng / Tarek Ahmed Ramadan
   * Function name : UpdateMethod
   * Function purpose : Update a selected row form the database
   * Needed Parameters :-
   * 1- Api_name : end point name for the called api
   * 2- params :  parameter which is will be needed to select the needed id of the selected row needed for delete
   * 3- body : parameter needed to show the affected values to be updated in the database
   */
  UpdateMethod(Api_name: any, body: any, params?: any) {
    return this.http.put(this.baseUrl + Api_name + "/" + params, body);
  }
  UpdateMethodWithPipe(Api_name: any, body?: any, params?: any) {
    if (params) {
      return this.http.put(this.baseUrl + Api_name + "/" + params, body).pipe(
        catchError((error) => {
          if (error.code == 500) {
            return throwError("server error check your network error");
          } else if (error.code == 400) {
            return throwError("bad request");
          } else {
            return throwError("error happen");
          }
        })
      );
    } else {
      return this.http.put(this.baseUrl + Api_name, body).pipe(
        catchError((error) => {
          if (error.code == 500) {
            return throwError("server error check your network error");
          } else if (error.code == 400) {
            return throwError("bad request");
          } else {
            return throwError("error happen");
          }
        })
      );
    }
  }
}
