import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.get('currentSession.currentHome.users').then( (users) => {
            return {
                home: this.get('currentSession.currentHome'),
                members: users.map((user) => {
                    return {
                        user: user,
                        info: this.get('currentSession.currentHomeInfo')
                    };
                })
            };
        })
    }
});
