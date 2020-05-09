const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const path = require('path');

const gc = new Storage({
    keyFilename: path.join(__dirname, '../../config/serviceAccountKey.json'),
    projectId: process.env.projectId
});

const bucket = gc.bucket(process.env.url_Bucket);

exports.uploadImageToStorage = (file, folderName) => {
    return new Promise((resolve, rejects) => {
        const fileUpload = bucket.file(folderName + '/' + file.name);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            const url = format(
                `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${folderName}%2F${file.name}?alt=media`
            );
            resolve(url);
        });

        blobStream.end(file.data);
    });
};
