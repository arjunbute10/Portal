import CryptoJS from 'crypto-js';

class LocalStorageUtil {
    private static defaultEncryptionKey = 'B4uPWB9h8fvD2D6TzCC6ECa5Ry7M32qt';

    static setItem(key: string, value: any, useEncryption = false): void {
        let serializedValue = JSON.stringify(value);

        if (useEncryption) {
            serializedValue = CryptoJS.AES.encrypt(serializedValue, this.defaultEncryptionKey).toString();
        }

        localStorage.setItem(key, serializedValue);
    }

    static getItem(key: string, useEncryption = false): any {
        const item = localStorage.getItem(key);

        if (item) {
            let value = useEncryption
                ? CryptoJS.AES.decrypt(item, this.defaultEncryptionKey).toString(CryptoJS.enc.Utf8)
                : item;

            return JSON.parse(value);
        }

        return null;
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}

export default LocalStorageUtil;
