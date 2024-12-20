import { Song } from '../database/models/songModel.js'
import { Album } from '../database/models/albumModel.js'
import cloudinary from '../database/cloudinary.js'
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'video', })
        return result.secure_url
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading file to Cloudinary")
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audio || !req.files.imageFile) {
            return res.status(400).json({ message: "Missing audio or image file" });
        }


        const { title, albumId, artist, duration } = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })
        await song.save()

        // if albumId is provided, add the song to the album
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: {
                    songs: song._id
                }
            })

        }
        res.status(200).json(song)
    }
    catch (error) {
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params

        const song = await Song.findById(id)

        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {
                    songs: song._id
                }
            })
        }

        await Song.findByIdAndDelete(id)

        res.status(200).json({ message: "Song deleted successfully" })
    } catch (error) {

        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body
        const { imageFile } = req.files

        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await album.save()
        res.status(200).json(album)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params

        await Song.deleteMany({ albumId: id })
        await Album.findByIdAndDelete(id)

        res.status(200).json({ message: "Album deleted successfully" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true })
}