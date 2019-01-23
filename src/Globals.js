export const globalVariables = {
    HubSpotKey: "e2032f87-8de8-4e18-8f16-f4210e714245",

    amazon_Bucket: process.env.REACT_APP_ENV_URL == 'production' ?
        "https://s3.us-east-2.amazonaws.com/production-static-asset/" :
        "https://s3.ap-south-1.amazonaws.com/varshalteamprivatebucket/faldax/",

    //API_URL: 'http://18.191.87.133:8084', //Live URL

    //API_URL: 'http://192.168.2.224:1337', //Kalpit Local URL

    API_URL: 'http://192.168.1.211:1337', //Mansi's URL

    //API_URL: 'http://192.168.3.32:1337', //Krina Local URL

    // API_URL: process.env.REACT_APP_ENV_URL == 'production' ?
    //     'https://prod-backend.faldax.com' :
    //     'https://dev-backend.faldax.com',

    // API_URL: 'http://13.58.130.154:8989' //Client Live URL
}
