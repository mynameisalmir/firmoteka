import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: "eu-central-1_rnbahh2PL",
    ClientId: "1nebc2to9dq57flmu7surh0jss",
  };

  export default new CognitoUserPool(poolData);
