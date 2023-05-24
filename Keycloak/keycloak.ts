import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8888/auth/',
  realm: 'nextjs',
  clientId: 'react-client',
});

// Initialize Keycloak
keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (authenticated) {
    console.log('User is authenticated');
    console.log('Token: ', keycloak.token);
    console.log('Refresh token: ', keycloak.refreshToken);
  } else {
    console.log('User is not authenticated');
    keycloak.login();
  }
}).catch((error) => {
  console.error('Keycloak initialization failed', error);
});
export default keycloak;
