
export default class ArsosControl {
    constructor(token) {
        this.token = token;    
    }
    

    startWtg(assetPath) {	
        console.log('startWtg');
        //var ctxt = getEntityContext(assetPath);
        //sendRpc(ctxt.siteId, "Start", parameters);
    };
    
    stopWtg(assetPath) {
        var ctxt = getEntityContext(assetPath);
        sendRpc(ctxt, "SetPoint", regulation);
    };
    
    sendRegulation(sitePath, regulation) {
        var ctxt = getEntityContext(sitePath);
        sendRpc(ctxt, "SetPoint", regulation);
    };    
    
    // Este método pueden necesitar invocarlo los widgets también... 
    // Por ejemplo, para regulación necesito acceder a getEntityContext("PARK_Robres").targetAttributes.ratedPower
    getEntityContext(assetPath) {
        // Usar API the Thingsboard para obtener contexto	
        // ¿cómo es más fácil? ¿con atributos de servidor?        
        return {
            //targetId: ...,
            targetPath: assetPath,
            targetAttributes: { }, // el diccionario con atributos de servidor, con ratedPower, etc...
            //sitePath: ..., 
            //siteId: ...
            //principal: // Es el email del usuario que hace la llamada, ¿se puede?
        };
    };

    sendRpc(ctxt, method, value) {
        
        xhttp.open('POST', '/api/plugins/rpc/twoway/' + siteId);
            xhttp.withCredentials = true;
            xhttp.setRequestHeader('X-Authorization', 'Bearer ' + this._token);
            xhttp.send(JSON.stringify({
                "method": method,
                "params": {
                    "entityId": {
                        "id": ctxt.targetId,
                        "entityType": "DEVICE"
                    },
                    "value": value,
                    "principal": ctxt.principal
                }
            }));
    }
}