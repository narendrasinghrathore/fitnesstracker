import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// rxjs imports
import { tap } from 'rxjs/operators';

// store import
import { Store } from 'store';
import { User } from 'src/interfaces/User';

@Injectable()
export class AuthService {

    auth$ = this.af.authState.pipe(
        tap(
            next => {
                if (!next) {
                    this.store.set('user', null);
                    return;
                }
                const user: User = {
                    email: next.email,
                    uid: next.uid,
                    authenticated: true
                };

                this.store.set('user', user);
            }
        ));
    constructor(
        private store: Store,
        private af: AngularFireAuth
    ) { }

    get authState() {
        return this.af.authState;
    }


    createUser(email: string, password: string) {
        return this.af.auth.createUserWithEmailAndPassword(email, password);

    }

    loginUser(email: string, password: string) {
        return this.af.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        this.af.auth.signOut();
    }
}
