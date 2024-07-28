sap.ui.define([

],function () {

    let oCrud = {

        _getToken: function () {
            let sUrl = "https://c396e641trial.authentication.us10.hana.ondemand.com/oauth/token";
            let oData = {
                grant_type: "client_credentials",
                client_id: "sb-cc2ae8bc-a06e-4770-b009-264a29bbceab!b312435|it-rt-c396e641trial!b55215",
                client_secret: "b7d926f6-aed1-4bca-a803-18206e5da3e4$IA8echMbO_4BO1HbTgNnSobJZl1CD8O1ja75YifBbLg="
            };
            
           return new Promise((resolve, reject)=>{
                $.post(sUrl, oData, null, 'json',{
                }).done((data)=>{
                    resolve(data.access_token);
                }).error((error)=>{
                    reject(error);
                });
            });
        },

        crud: async function (sAction, oData) {

            let sBaseUrl = "https://c396e641trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/s4hana/SAPUI5";
            let sProxy = "http://localhost:8081/";
            let sUrl = sProxy+sBaseUrl;
            let sToken = await this._getToken();

            switch (sAction) {
                case 'read':
                    await this._read(sBaseUrl, sToken);
                break;
                case 'create':
                    await this._create(sUrl, oData, sToken);
                break;
            };
        },

        _read: function (sUrl, sToken) {
            $.get({
                url: sUrl,
                headers:{
                    'Content-Type':'Application/json',
                    'Authorization':''
                }
            })
        },

        _create: function (sUrl, oData, sToken) {

            return new Promise((resolve, reject)=>{
                $.ajax({
                    url: sUrl,
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':'Bearer '+sToken,
                        'Body': JSON.stringify(oData)
                    },
                    dataType:'json',
                    username: 'sb-cc2ae8bc-a06e-4770-b009-264a29bbceab!b312435|it-rt-c396e641trial!b55215',
                    password: 'b7d926f6-aed1-4bca-a803-18206e5da3e4$IA8echMbO_4BO1HbTgNnSobJZl1CD8O1ja75YifBbLg='
                }).done((data)=>{
                    resolve(data);
                }).error((error)=>{
                    reject(error);
                });
            });
            
        }
    };

    return oCrud;
});