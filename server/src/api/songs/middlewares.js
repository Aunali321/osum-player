import { findSong } from "./songs.services.js";
import config from "../../config.js";
import { downloadSong, getPlaylist, search, getSong as getYSong } from '../../integrations/youtube_music.js'


export function checkDemoMode(_req, res, next) {
	if (config.DEMO_MODE) return res.json({ message: "This API is not available in demo mode" });

	next();
}

export function getId(req, _res, next) {
	const id = parseInt(req.params.id);

	if (isNaN(id)) return next(new Error("Invalid song id"));

	req.id = id;

	next();
}

export async function getSong(req, _res, next) {
	if (!req.id) return next(new Error("No id"));

	try {
		req.song = await findSong(req.id);

		if (req.song === null) return next(new Error("Song not found"));
	} catch (err) {
		return next(err);
	}

	next();
}

export async function searchYTSong(req, _res, next) {
	if (!req.query.query) return next(new Error("Invalid query"));	
	const result = await search(req.query.query);
	console.log("result", result);
	console.log("query", req.query.query);
	req.results = result;
}


export function getYTPlaylist(req, _res, next) {
	if (!req.query.url) return next(new Error("No url"));
	const results = getPlaylist(req.query.url);
	req.results = results;
}


export function getYTSong(req, _res, next) {
	if (!req.query.url) return next(new Error("No url"));
	const results = getYSong(req.query.url);
	req.results = results;
}


export function downloadYTSong(req, _res, next) {
	if (!req.query.url) return next(new Error("No url"));
	const results = downloadSong(req.query.url);
	req.results = results;
}

