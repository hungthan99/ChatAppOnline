const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client();
const BUCKET = "react-node-image-upload";
const { v4: uuidv4 } = require('uuid');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const uploadToS3 = async ({ file, userId }) => {
    const key = `${userId}/${uuidv4()}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });
    try {
        await s3.send(command);
        return { key }
    } catch (error) {
        console.log(error);
        return { error }
    }
};
exports.uploadToS3 = uploadToS3;

const getImageKeyByUser = async (userId) => {
    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: userId,
    });

    const { Contents = [] } = await s3.send(command);
    return Contents.map((image) => image.Key);
};
exports.getUserPresignedUrls = async (userId) => {
    try {
        const imageKeys = await getImageKeyByUser(userId);
        const presignedUrls = await Promise.all(
            imageKeys.map((key) => {
                const command = new GetObjectCommand({
                    Bucket: BUCKET,
                    Key: key,
                });
                return getSignedUrl(s3, command, { expiresIn: 900 })
            }
            ));
        return { presignedUrls };
    } catch (error) {
        console.log(error);
        return { error };
    }
};