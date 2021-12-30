class AuthService {    
    static instance = AuthService.instance || new AuthService();

    state = {
        idToken: null, 
        accessToken: null, 
        refreshToken: null,
        expirationDate: null
    };

    init(keycloak) {
        this.state = { keycloak: keycloak,
                       idToken: keycloak.idToken, 
                       accessToken: keycloak.token, 
                       refreshToken: keycloak.refreshToken,
                       expirationDate: keycloak.idTokenParsed.exp };
    }

    getIdToken() {
        return this.state.idToken;
    }

    getAccessToken() {
        return this.state.accessToken;
    }

    getRefreshToken() {
        return this.state.refreshToken;
    }

    getBearerHeader() {
        return { "Authorization": 'Bearer ' + this.getAccessToken() };                
        //return { 'x-access-token': this.getAccessToken() };  // for Node.js Express back-end        
    }

    logout() {
        return this.state.keycloak.logout();
    }
  }
  
export default AuthService;