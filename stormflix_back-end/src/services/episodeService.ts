import { Response } from "express";
import path from "path";
import fs from "fs";
import { WatchTimeAttributes } from "../models/WatchTime";
import { WatchTime } from "../models";

export const episodeService = {
  streamEpisodeToResponse: async (
    res: Response,
    videoUrl: string,
    range: string | undefined
  ) => {
    const filePath = path.join(__dirname, "../../uploads", videoUrl);
    const fileStat = fs.statSync(filePath);

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;

      const chunkSize = end - start + 1; // Ex: 1000 - 500 dá a diferença de mil e 500, mas não inclui o mil.

      const file = fs.createReadStream(filePath, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);

      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileStat.size,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      attributes: [
        "seconds",
        ["created_at", "createdAt"],
        ["updated_at", "updatedAt"],
      ],
      where: {
        userId,
        episodeId,
      },
    });

    return watchTime;
  },

  setWatchTime: async ({ userId, episodeId, seconds }: WatchTimeAttributes) => {
    const watchTimeAlreayExists = await WatchTime.findOne({
      where: {
        userId,
        episodeId,
      },
    });

    if (watchTimeAlreayExists) {
      watchTimeAlreayExists.seconds = seconds;
      await watchTimeAlreayExists.save();

      return watchTimeAlreayExists;
    } else {
      const watchTime = await WatchTime.create({
        userId,
        episodeId,
        seconds,
      });
      return watchTime;
    }
  },
};
