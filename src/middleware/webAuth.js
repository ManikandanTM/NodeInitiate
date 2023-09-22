import jwt from 'jsonwebtoken';
export const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

const webAuth = {};

webAuth.createAuthToken = (object, options) => {
    return jwt.sign(object, access_token_secret, options);
}

webAuth.checkJwt = (req, res, next) => {
    const token = req.headers['authorization'];
    try{
        jwt.verify(token, access_token_secret, function(err, decoded){
            if(err){
                return res.status(404).json({ status_code: 401, message: 'Unauthorized Access'});
            } else if(decoded){
                next();
            }
        });
    } catch (error){
        return res.status(404).json({ status_code: 401, message: 'Unauthorized Access'});
    }
}

export default webAuth;