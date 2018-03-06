export default class Utils {
    static formatFirebaseMessage(rawMessage) {
        const prefixLen = ('Error:  '.length) + 1;
        if (rawMessage instanceof String || typeof rawMessage === 'string') {
            return rawMessage.substr(prefixLen);
        } else {
            return rawMessage;

        }
    }
}