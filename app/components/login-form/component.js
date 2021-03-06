import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    errorHandler: Ember.inject.service(),
    firebaseApp: Ember.inject.service(),
    classNames: [
        'signin-container',
        'login'
    ],
    addErrors(errors) {
        this.get('errorHandler').showFlashMessage({
            flashMessages: errors
        });
    },
    loginUser(provider, loginInfo) {
        let data = {
            provider: provider
        };
        if (loginInfo) {
            $.extend(data, loginInfo);
        }
        this.get('session').open("firebase", data).then( (data) => {
            if (provider !== 'password') {
                this.get('store').query('user', { orderBy: 'uid', equalTo: data.uid }).then( (users) => {
                    if (users.get('length') > 0) {
                        this.sendAction('loginComplete');
                    } else {
                        this.sendAction('registered', {
                            uid: data.uid
                        }, provider);
                    }
                })
            } else {
                this.sendAction('loginComplete');
            }
        }).catch( (error) => {
            this.addErrors([error.message]);
        });
    },
    actions: {
        signIn(provider) {
            let data;
            if (provider === 'password') {
                if (!this.$('.ui.form').form('is valid')) {
                    return;
                }
                data = {
                    email: this.get('identification'),
                    password: this.get('password')
                };
            }
            this.loginUser(provider, data);
        },
        register() {
            if (!this.$('.ui.form').form('is valid')) {
                return;
            }
            let self = this;
            const auth = this.get('firebaseApp').auth();
            auth.createUserWithEmailAndPassword(self.get('identification'), self.get('password'))
                .then(function(userData) {
                    console.log("Successfully created user account with uid:", userData.uid);
                    self.sendAction('registered', userData, 'password', {
                        email    : self.get('identification'),
                        password : self.get('password')
                    });
                })
                .catch(function (error) {
                    self.addErrors([error.message]);
                });
        }
    },
    didInsertElement() {
        var self = this;
        this.$('.ui.form').form({
            on: 'submit',
            inline: true,
            fields: {
                email: {
                    identifier: 'identification',
                    rules: [{
                        type: 'email',
                        prompt: 'Please enter your email'
                    }]
                },
                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your password'
                    }]
                }
            },
            onSuccess() {
                self.sendAction('login');
            }
        });
    }
});
