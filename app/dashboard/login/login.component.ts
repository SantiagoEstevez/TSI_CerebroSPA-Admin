import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Usuario } from '../../usuarios/usuario';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        var usuario = new Usuario();
        usuario.Username = this.model.username;
        usuario.Password = this.model.password;

        this.loading = true;
        //this.authenticationService.login(usuario)
        //    .subscribe(result => {
        //        console.log("despues");
        //        if (result == true) {
        //            // login successful
        //            this.router.navigate(['/']);
        //        } else {
        //            // login failed
        //            this.error = 'Username or password is incorrect';
        //            this.loading = false;
        //        }
        //    });

        console.log("segunda");
        //this.authenticationService.login2(usuario);
        this.authenticationService.login3(usuario).subscribe(result => {
            console.log(result);
            console.log(localStorage.getItem('currentUser'));
        });
        
        
            
    }
}