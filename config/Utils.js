export default class Utils {
    static formatFirebaseMessage(rawMessage) {
        const prefixLen = ('Error:  '.length) + 1;


        if (rawMessage instanceof String || typeof rawMessage === 'string') {
            const colonIndex = rawMessage.indexOf(':');

            if (colonIndex >= 0) {
                return rawMessage.substr(colonIndex + 1).trim();
            }
        }
        return rawMessage;
    }
}