const Utils = require('../../Utils');

const cloudinary = require('cloudinary').v2 /* VERSION V2 */
/**
 * Cloudinary class
 */
class Cloudinary {
    constructor(cloud_name, api_key, api_secret) {
        // CREATE SHARED INSTANCE
        if (this.createSingleton()) {
            this.cloudName = cloud_name;
            this.apiKey = api_key;
            this.apiSecret = api_secret;
            this.init()
            return this;
        } else {
            return Cloudinary._sharedInstance;
        }
    }

    init = () => {
        this.config();
    }

    config = () => {
        cloudinary.config({ /* CONFIG CLOUDINARY */
            cloud_name: this.cloudName,
            api_key: this.apiKey,
            api_secret: this.apiSecret
        });
    }
    /**
     * List of resources
     * @param {object} resourcesOpts Resources options
     * @param {number} limitResources Limit of requested resources (-1 if all)
     */
    getResources = (resourcesOpts, limitResources) => {
        return new Promise((res, rej) => {
            if (limitResources != -1 && resourcesOpts.max_results > limitResources) resourcesOpts.max_results = limitResources;
            var rscCount = 0;
            var allResources = [];
            var nextCursor = null;

            (async () => { /* asyncronus dowhile loop */
                do {
                    try {
                        const result = await cloudinary.search
                            .sort_by('public_id', 'desc')
                            .max_results(resourcesOpts.max_results)
                            .expression("resource_type:image")
                            .next_cursor(nextCursor)
                            .execute()
                        const newResources = result.resources;
                        rscCount += newResources.length
                        nextCursor = result.next_cursor;

                        allResources = allResources.concat(newResources)

                        if (limitResources == -1) {
                            if (!nextCursor) {
                                res(allResources)
                            } else {
                                resourcesOpts.next_cursor = nextCursor;
                            }
                        } else if (limitResources >= 0) {
                            if ((rscCount >= limitResources)) {
                                res(allResources)
                            } else {
                                resourcesOpts.next_cursor = nextCursor;
                            }
                        }
                    } catch (error) {
                        rej(error)
                    }
                } while (limitResources == -1 ? nextCursor : !(rscCount >= limitResources));
            })();
        })
    }
    /**
     * Generate statistics
     * @param {array} resources Array of resources
     * @param {object} opts Statistics options
     */
    generateStatistics = (resources, opts) => {
        var result = {
            totalImages: resources.length,
        }
        if (opts.includes('size')) {
            const sortedSize = resources.sort((a, b) => {
                if (a.bytes > b.bytes) {
                    return 1;
                } if (a.bytes < b.bytes) {
                    return -1
                } else {
                    return 0;
                }
            })
            result.biggestPicture = sortedSize[sortedSize.length - 1].secure_url;
            result.smallestPicture = sortedSize[0].secure_url;
        }
        if (opts.includes('avgSze')) {
            var sum = 0;
            for (let i = 0; i < resources.length; i++) {
                const el = resources[i];
                sum += el.bytes
            }
            result.avgSze = sum / resources.length
        }
        if (opts.includes('format')) {
            var formats = {}
            for (let i = 0; i < resources.length; i++) {
                const el = resources[i];
                if (!formats.hasOwnProperty(el.format)) {
                    formats[el.format] = 1
                } else {
                    formats[el.format] += 1;
                }
            }
            result.formats = formats;
        }
        return result;
    }
    /**
     * Export to CSV
     * @param {array} resources Array of resources
     */
    exportToCSV = (resources) => {
        var csvStr = '';
        const keysValid = Utils.csv.keysValid(resources);
        if (keysValid) {
            const keys = Object.keys(resources[0]);
            csvStr += keys.join(',') + '\n';
            for (let i = 0; i < resources.length; i++) {
                const el = resources[i];
                const values = Object.values(el);
                for (let j = 0; j < values.length; j++) {
                    const value = values[j];
                    if (!value) continue;
                    if (typeof value === 'object') {
                        values[j] = value[Object.keys(value)[0]];
                    }
                }
                csvStr += values.join(',') + '\n';
            }
            return csvStr;
        } else {
            return new Error("Cannot export to csv because object keys in array are not the same.")
        }
    }
    /**
     * Creates shared instance for this class
     */
    createSingleton = () => {
        if (Cloudinary._sharedInstance) {
            return false
        } else {
            Cloudinary._sharedInstance = this;
            return true
        }
    }
}

module.exports = Cloudinary;