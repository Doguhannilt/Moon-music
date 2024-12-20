import { Song } from "../database/models/songModel.js";
import { User } from "../database/models/userModel.js";
import { Album } from "../database/models/albumModel.js";

export const getAllStats = async (req, res, next) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtistsResult] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),
            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist"
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

        // uniqueArtistsResult is an array with a single object containing the count.
        const uniqueArtists = uniqueArtistsResult[0]?.count || 0;

        res.json({ totalSongs, totalAlbums, totalUsers, uniqueArtists });
    } catch (error) {
        next(error);
    }
}