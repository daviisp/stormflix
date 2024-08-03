import { User } from "../models/User";
import { UserCreationAttributes } from "../models/User";
import { EpisodeInstance } from "../models/Episode";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = []

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId)
      currentList.push(episode)
      return currentList
    }

    const filterLastEpisode = currentList.filter(ep => ep.courseId !== episode.courseId)
    filterLastEpisode.push(episode)
    return filterLastEpisode

  }, [] as EpisodeInstance[])

  return lastEpisodes
}


export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      attributes: [
        "id",
        ["first_name", "firstName"],
        ["last_name", "lastName"],
        "phone",
        "birth",
        "email",
        "password",
      ],
      where: {
        email,
      },
    });

    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },

  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedUsers[0];
  },

  updatePassword: async (id: string | number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      {
        password,
      },
      {
        where: { id },
        individualHooks: true,
        returning: true,
      }
    );

    return updatedUsers[0];
  },

  watched: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        attributes: ["id", "name", "synopsis", ["video_url", "videoUrl"]],
      },
    });

    if (!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

      const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
      // @ts-ignore
      keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)
      return keepWatchingList
  },
};
