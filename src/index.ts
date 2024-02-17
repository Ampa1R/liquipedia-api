import { DotaClient } from './client/dota';
import { Config } from './types/config';

export class LiquipediaApi {
  dota: DotaClient;

  constructor(private config: Config) {
    this.dota = new DotaClient(config);
  }
}


const api = new LiquipediaApi({
  USER_AGENT: 'Test/1.0 (hi.ampa1r@gmail.com)'
});

(async () => {
  const result = await api.dota.getMatches();
  console.log(result);
})();
