module.exports = {
    /**
     * Read json from a given (relative) path (string)
     */
    readJson: (path) => {
        return new Promise((res, rej) => {
            const fs = require('fs');
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) return rej(err);
                res(JSON.parse(data))
            });
        });
    },
    csv: {
        /**
         * Return true if all keys in array objects are the same
         */
        keysValid: (array) => {
            const keys = JSON.stringify(Object.keys(array[0]));
            for (let i = 0; i < array.length; i++) {
                const el = array[i];
                const nextKeys = JSON.stringify(Object.keys(el))
                if (nextKeys !== keys) {
                    return false;
                }
            }
            return true;
        }
    }
}