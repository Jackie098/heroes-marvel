import { BaseServiceMarvel } from "../BaseServiceMarvel.js";

export class MarvelHeroesService extends BaseServiceMarvel {
  async getHeroes(params) {
    const response = await this._api.get("/characters", {
      params,
    });

    return response.data;
  }

  async getHero(characterId) {
    const response = await this._api.get(`/characters/${characterId}`);

    return response.data;
  }
}
