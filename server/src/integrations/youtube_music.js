// example api query: POST to /api/v1/songs/download/youtube?query=X
import ytsr from '@distube/ytsr';
import ytpl from '@distube/ytpl';
import fs from "fs";
import ytdl from "@distube/ytdl-core";

export async function search(query) {
    return await ytsr(query, { limit: 1 });
}

export function getPlaylist(url) {
    return ytpl(url);
}

export function getSong(url) {
    return ytdl.getInfo(url);
}

export function downloadSong(url) {
    return ytdl(url, { filter: "audioonly" })
        .pipe(fs.createWriteStream("song.mp3"));
}
