import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export type Provider = 'google';

@Component({
    selector: 'app-button-providers',
    templateUrl: './button-providers.component.html',
    styleUrls: ['./button-providers.component.scss'],
})
export class ButtonProviders {
    @Input() isLogin = false;

    private _authService = inject(AuthService);
    private _router = inject(Router);

    providerAction(provider: Provider): void {
        if (provider === 'google') {
            this.signUpWithGoogle();
        } else {
            alert('Not implemented yet');
        }
    }

    async signUpWithGoogle(): Promise<void> {
        try {
            const result = await this._authService.signInWithGoogleProvider();
            this._router.navigate(['/dashboard']);
            console.log(result);
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
}

