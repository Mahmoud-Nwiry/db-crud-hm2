// const config = {
//     user : 'm',
//     password : '123',
//     server : `DESKTOP-R9D9LVD`,
//     database : 'users',
//     trustServerCertificate: true
// }

// module.exports = config;

const config = {
    user: 'mahmoud',
    password :'mahmoud',
    server :`DESKTOP-R9D9LVD`,
    database : 'user',
    options : {
         trustedConnection:true,
         encrypt:true,
         enableArithAbort:true,
         trustServerCertificate: true
    }     
}


module.exports =  config;
