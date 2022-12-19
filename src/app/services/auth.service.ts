import { ToastrService } from 'ngx-toastr';

import { ITokenModel } from './../models/request/login/tokenModel';
import { ILoginModel } from './../models/request/login/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl=" http://localhost:3000/users"
  isLogin = false;
  roleAs:string;
  applyName:string

  constructor(private httpClient:HttpClient, private toastrService:ToastrService) { }

  login(user:ILoginModel){

    return this.httpClient.get<ILoginModel>
    (this.apiUrl + "?email=" + user.email + "&password="+ user.password)

  }

  roleLogin(value:string){

    this.isLogin = true;
    this.roleAs  = value;
    localStorage.setItem("role",this.roleAs);
    return {success: this.isLogin , role: this.roleAs}


  }

  getRole(){
    this.roleAs = localStorage.getItem("role");
    return this.roleAs
  }
  getName(){
    this.applyName = localStorage.getItem("name");
    return this.applyName
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true

    }else {
      return false
    }
  }


  logout(){
      // localStorage.removeItem("token")
      // localStorage.removeItem("role")
      // console.log("çıktın")
      localStorage.clear()
      this.toastrService.success("Çıkış Yapıldı")

}
}
