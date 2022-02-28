import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const game = this.repository
      .createQueryBuilder("game")
      .where(`game.title ilike '%${param}%'`)
      .getMany()

    return game
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const games = await this.repository.query("SELECT id FROM games"); // Complete usando raw query
    return [{count: String(games.length)}]
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("game")
      .relation(Game, "users")
      .of(id)
      .loadMany()
      // Complete usando query builder
  }
}
