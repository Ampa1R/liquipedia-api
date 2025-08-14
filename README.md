# Liquipedia Node.js API

# Intro
install package
```bash
npm i liquipedia-api
```

Please refer to [liquipedia's terms of use](https://liquipedia.net/api-terms-of-use) for rate-limiting information. 

init api
```ts
import { LiquipediaApi } from 'liquipedia-api';

const liquipediaApi = new LiquipediaApi({
  USER_AGENT: 'MyAwesomeProject/1.0 (my.email@gmail.com)',
});
```

## methods

###  Dota

#### getTeams
```ts
api.dota.getTeams()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    name: 'B8',
    region: 'CIS',
    url: 'https://liquipedia.net/dota2/B8',
    logo: 'https://liquipedia.net/commons/images/thumb/c/c6/B8_lightmode.png/41px-B8_lightmode.png'
  },
  {
    name: 'CIS Rejects',
    region: 'CIS',
    url: 'https://liquipedia.net/dota2/CIS_Rejects',
    logo: 'https://liquipedia.net/commons/images/thumb/1/12/CIS_Rejects_allmode.png/50px-CIS_Rejects_allmode.png'
  },
]
```
</details>

#### getTransfers
```ts
api.dota.getTransfers()
```

<details>
  <summary>response example</summary>
  
```ts
[
  {
    date: 2022-02-08T00:00:00.000Z,
    players: [ '23savage' ],
    from: { team: 'T1', position: undefined },
    to: { team: 'T1', position: '(Inactive)' }
  },
  {
    date: 2022-02-06T00:00:00.000Z,
    players: [ 'DaaD-' ],
    from: { team: 'KBU.US', position: undefined },
    to: { team: '5RATFORCESTAFF', position: undefined }
  },
  {
    date: 2022-02-06T00:00:00.000Z,
    players: [ 'albinozebra1' ],
    from: { team: 'Electronic Boys', position: undefined },
    to: { team: '5RATFORCESTAFF', position: undefined }
  },
  {
    date: 2022-02-06T00:00:00.000Z,
    players: [ 'Lil_Nick' ],
    from: { team: undefined, position: undefined },
    to: { team: '5RATFORCESTAFF', position: undefined }
  },
  {
    date: 2022-02-06T00:00:00.000Z,
    players: [ 'Italiano Gangstar', 'TingleK1ng', 'Overlom' ],
    from: { team: '5RATFORCESTAFF', position: undefined },
    to: { team: undefined, position: undefined }
  },
]
```
</details>


#### getMatches

```ts
api.dota.getMatches()
```

<details>
  <summary>response example</summary>

```ts
[
  {
    leftTeam: { name: 'Gladiators', shortName: 'Gla', currentScore: 1 },
    rightTeam: { name: 'Gambit Esports', shortName: 'Gambit', currentScore: 0 },
    bestOf: 3,
    status: 'Live',
    startTime: 2022-02-08T18:00:00.000Z,
    twitchStream: 'https://twitch.tv/beyondthesummit2',
    tournamentName: 'Dota 2 Champions League Season 7',
    tournamentShortName: 'D2CL Season 7'
  }
]
```
</details>

#### getHeroes
```ts
api.dota.getHeroes()
```


<details>
  <summary>response example</summary>
  
```ts
[
  {
    name: 'Weaver',
    attr: 'Agility',
    img: 'https://liquipedia.net/commons/images/thumb/5/59/Weaver_Large.png/125px-Weaver_Large.png',
    url: 'https://liquipedia.net/dota2/Weaver'
  },
  {
    name: 'Ancient Apparition',
    attr: 'Intelligence',
    img: 'https://liquipedia.net/commons/images/thumb/5/5d/Ancient_Apparition_Large.png/125px-Ancient_Apparition_Large.png',
    url: 'https://liquipedia.net/dota2/Ancient_Apparition'
  },
]
```
</details>

#### getItems
```ts
api.dota.getItems()
```

<details>
  <summary>response example</summary>

```ts
[
  {
    type: 'Basic',
    category: 'Miscellaneous',
    url: 'https://liquipedia.net/dota2/Wind_Lace',
    name: 'Wind Lace',
    img: 'https://liquipedia.net/commons/images/thumb/a/a1/Wind_Lace.png/60px-Wind_Lace.png',
    price: 250
  },
  {
    type: 'Basic',
    category: 'Secret Shop',
    url: 'https://liquipedia.net/dota2/Demon_Edge',
    name: 'Demon Edge',
    img: 'https://liquipedia.net/commons/images/thumb/a/ae/Demon_Edge.png/60px-Demon_Edge.png',
    price: 2200
  },
]
```
</details>

#### getPatches
```ts
api.dota.getPatches()
```


<details>
  <summary>response example</summary>

```ts
[
  {
    version: '7.29b',
    date: 2021-04-15T21:00:00.000Z,
    changes: 'Balance Changes\n',
    url: 'https://liquipedia.net/dota2/7.29b'
  },
  {
    version: '7.29',
    date: 2021-04-08T21:00:00.000Z,
    changes: 'New Hero  Dawnbreaker\n' +
      'Added to Captains Mode:\n' +
      ' Hoodwink\n' +
      'Map Updates\n' +
      'Water Power Rune\n' +
      'Balance Changes\n',
    url: 'https://liquipedia.net/dota2/7.29'
  },
]
```
</details>

#### getTournaments
```ts
api.dota.getTournaments()
```


<details>
  <summary>response example</summary>
  
```ts
[
  {
    status: 'Upcoming',
    tier: 'Tier 2',
    name: 'DPC SA 2021/2022 Tour 2: Division I',
    url: 'https://liquipedia.net/dota2/Dota_Pro_Circuit/2021-22/2/South_America/Division_I',
    dates: 'Mar 17 - Apr 22, 2022',
    prizePool: '$205,000',
    teams: '8',
    hostLocation: ' South America',
    winner: 'TBD',
    runnerUp: 'TBD'
  },
]
```
</details>

###  PUBG Mobile

#### getTeams
```ts
api.pubgmobile.getTeams()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    name: 'Team Soul',
    region: 'India',
    url: 'https://liquipedia.net/pubgmobile/Team_Soul',
    logo: 'https://liquipedia.net/commons/images/thumb/.../Team_Soul_logo.png'
  },
  {
    name: 'GodLike Esports',
    region: 'India',
    url: 'https://liquipedia.net/pubgmobile/GodLike_Esports',
    logo: 'https://liquipedia.net/commons/images/thumb/.../GodLike_Esports_logo.png'
  },
]
```
</details>

#### getTransfers
```ts
api.pubgmobile.getTransfers()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    date: 2023-01-15T00:00:00.000Z,
    players: ['ScoutOP'],
    from: { team: 'Team Soul', position: undefined },
    to: { team: 'GodLike Esports', position: undefined }
  },
]
```
</details>

#### getMatches
```ts
api.pubgmobile.getMatches()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    leftTeam: { name: 'Team Soul', shortName: 'TS', currentScore: 1 },
    rightTeam: { name: 'GodLike Esports', shortName: 'GL', currentScore: 0 },
    bestOf: 3,
    status: 'Live',
    startTime: 2023-01-15T18:00:00.000Z,
    twitchStream: 'https://twitch.tv/battlegroundsmobileindia',
    tournamentName: 'Battlegrounds Mobile India Series 2023',
    tournamentShortName: 'BGMI Series 2023'
  }
]
```
</details>

#### getMaps
```ts
api.pubgmobile.getMaps()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    name: 'Erangel',
    type: 'Battle Royale',
    img: 'https://liquipedia.net/commons/images/thumb/.../Erangel.png',
    url: 'https://liquipedia.net/pubgmobile/Erangel'
  },
  {
    name: 'Miramar',
    type: 'Battle Royale',
    img: 'https://liquipedia.net/commons/images/thumb/.../Miramar.png',
    url: 'https://liquipedia.net/pubgmobile/Miramar'
  },
]
```
</details>

#### getWeapons
```ts
api.pubgmobile.getWeapons()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    name: 'AKM',
    category: 'Assault Rifle',
    img: 'https://liquipedia.net/commons/images/thumb/.../AKM.png',
    url: 'https://liquipedia.net/pubgmobile/AKM'
  },
  {
    name: 'M416',
    category: 'Assault Rifle',
    img: 'https://liquipedia.net/commons/images/thumb/.../M416.png',
    url: 'https://liquipedia.net/pubgmobile/M416'
  },
]
```
</details>

#### getVehicles
```ts
api.pubgmobile.getVehicles()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    name: 'UAZ',
    category: 'Land Vehicle',
    img: 'https://liquipedia.net/commons/images/thumb/.../UAZ.png',
    url: 'https://liquipedia.net/pubgmobile/UAZ'
  },
  {
    name: 'Motorboat',
    category: 'Water Vehicle',
    img: 'https://liquipedia.net/commons/images/thumb/.../Motorboat.png',
    url: 'https://liquipedia.net/pubgmobile/Motorboat'
  },
]
```
</details>

#### getTournaments
```ts
api.pubgmobile.getTournaments()
```
<details>
  <summary>response example</summary>

```ts
[
  {
    status: 'Upcoming',
    tier: 'Tier 1',
    name: 'PUBG Mobile Global Championship 2023',
    url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2023',
    dates: 'Nov 15 - Dec 20, 2023',
    prizePool: '$2,000,000',
    teams: '16',
    hostLocation: 'Dubai, UAE',
    winner: 'TBD',
    runnerUp: 'TBD'
  },
]
```
</details>
