function getEnvConfig(){
    const ENV_CONFIG = process.env.NODE_ENV || '';
    
    const env_options = {
        path: `./.env${ENV_CONFIG}`
    };
    
    return env_options;
}

module.exports = getEnvConfig();