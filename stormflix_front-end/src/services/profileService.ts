import api from "./api";

interface UserParams {
  id?: number | string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

const profileService = {
  fetchCurrent: async () => {
    const token = sessionStorage.getItem("stormflix-token");
    const res = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res.data;
  },

  userUpdate: async (params: UserParams) => {
    const token = sessionStorage.getItem("stormflix-token");

    const res = await api
      .put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 401) {
          return err.response;
        }

        return err;
      });

    return res.status;
  },

  passwordUpdate: async (params: PasswordParams) => {
    const token = sessionStorage.getItem("stormflix-token");

    const res = await api
      .put("/users/current/password", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 401) {
          return err.response;
        }

        return err;
      });

    return res.status;
  },

  lastEpisodeWatched: async () => {
    const token = sessionStorage.getItem("stormflix-token");

    const res = await api
      .get("/users/current/watching", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err;
      });

    return res;
  },
};

export default profileService;
