class MeAPI {
  constructor() {}

  async getMe() {}

  async getMyLikes(userId: string) {
    const response = await fetch(`/api/me/likes?userId=${userId}`, {
      cache: "no-store"
    });
    const data = await response.json();

    return data;
  }

  async getMyPosts(userId: string) {
    const response = await fetch(`/api/me/posts?userId=${userId}`, {
      cache: "no-store"
    });
    const data = await response.json();

    return data;
  }
}

export default MeAPI;
