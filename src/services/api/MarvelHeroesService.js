import { BaseServiceMarvel } from "../BaseServiceMarvel";

export class MarvelHeroesService extends BaseServiceMarvel {
  async getHeroes(params) {
    const response = await this._api.get("/characters", {
      params: { nameStartsWith: params?.nameStartsWith },
    });

    return response.data;
  }

  async getHero(characterId) {
    const response = await this._api.get(`/characters/${characterId}`);

    return response.data;
  }
}
