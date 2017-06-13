"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var usuario_1 = require('../usuarios/usuario');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.url = 'http://localhost:6346/api/usuario/login';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.token = currentUser && currentUser.token;
    }
    AuthenticationService.prototype.login = function (usuario) {
        var _this = this;
        return this.http.post(this.url, JSON.stringify(usuario))
            .map(function (response) {
            // login successful if there's a jwt token in the response
            console.log("antes de tocar");
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(usuario));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.login2 = function (usuario) {
        console.log("entre");
        return this.http
            .post(this.url, JSON.stringify(usuario_1.Usuario), { headers: this.headers })
            .map(function (res) {
            console.log("emm se supone que me deberia estar llegando.");
            console.log(res.json());
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.login3 = function (usuario) {
        return this.http
            .post(this.url, JSON.stringify(usuario_1.Usuario), { headers: this.headers })
            .map(function (response) {
            localStorage.setItem('currentUser', response.json());
            return true;
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map