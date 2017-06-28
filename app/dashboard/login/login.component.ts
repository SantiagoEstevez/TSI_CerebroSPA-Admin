import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Usuario } from '../../usuarios/usuario';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    loading = false;
    error = '';
    user: string;
    password: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        var usuario = new Usuario();
        usuario.CI = "477";
        usuario.Name = "santiago";
        usuario.Lastname = "estevez";
        usuario.Username = this.user;
        usuario.Password = this.password;

        this.loading = true;
        this.authenticationService.login(usuario).subscribe(result => {
            if (result == true) {
                // login successful
                this.router.navigate(['/']);
            } else {
                // login failed
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
    }
}