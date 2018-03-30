export default class Utils {
    static formatFirebaseMessage(rawMessage) {
        if (rawMessage instanceof String || typeof rawMessage === 'string') {
            const colonIndex = rawMessage.indexOf(':');
            if (colonIndex >= 0) {
                return rawMessage.substr(colonIndex + 1).trim();
            }
        }
        return rawMessage;
    }

    static convertFirebaseObjectToArray(firebaseObject) {
        let _arr = new Array();

        try {
            for(item in firebaseObject) {
                _arr[parseInt(item)] = firebaseObject[item];
            }
        } catch(err) {
            console.log(err);
            return null;
        }

        console.log("RETURNED: ", _arr);

        return _arr;        
    }
}