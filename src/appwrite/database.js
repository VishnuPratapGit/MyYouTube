import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../env/config";

class DatabaseServices {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createVideoPost({ title, description, thumbnailId, audience, visibility, videoId, userId, channelName }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(), // documentId
                { title, description, thumbnailId, audience, visibility, videoId, userId, channelName }
            );
        } catch (error) {
            console.log("Appwrite databaseServices :: createPost :: error: ", error.message);
            throw error;
        }
    }

    async updateVideoPost(postid, data) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postid,
                data
            );
        } catch (error) {
            console.log("Appwrite databaseServices :: updatePost :: error:", error.message);
            throw error;
        }
    }


    async deleteVideoPost(postid) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postid
            );
            return true;
        } catch (error) {
            console.log("Appwrite databaseServices :: deletePost :: error: ", error.message);
            return false;
        }
    }

    async getPost(postid) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postid
            );
        } catch (error) {
            console.log("Appwrite databaseServices :: getPost :: error: ", error.message);
            return false;
        }
    }

    async getPosts(queries = [], limit = 8, offset = 0) {
        try {
            queries.push(Query.limit(limit), Query.offset(offset))
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite databaseServices :: getPosts :: error: ", error.message);
            throw error;
        }
    }

    // File upload services in appwrite storage.

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error.message);
            return false;
        }
    }

    async deleteStorageFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteVideo :: error", error.message);
            return false;
        }
    }

    async getFileData(fileId) {
        try {
            return await this.storage.getFile(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: getFileData :: error", error.message);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        );
    }

    getThumbnailPreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const databaseServices = new DatabaseServices();

export default databaseServices;
