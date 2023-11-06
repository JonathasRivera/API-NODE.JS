const requestCountByIP = {};

const rateLimit = (req, res, next) => {
    const clientIP = req.ip;

    if(requestCountByIP[clientIP]) {
        if(requestCountByIP[clientIP] > 5){
            return res.status(429).json({
                error: 'Você atingiu o limite de requisições, aguarde 2 minutos!'
            })
        }
        requestCountByIP[clientIP]++;
    } else {
        requestCountByIP[clientIP] = 1;

        setTimeout(() => {
            delete requestCountByIP[clientIP];
        }, 120000)
    }
    next();
}

module.exports = rateLimit;