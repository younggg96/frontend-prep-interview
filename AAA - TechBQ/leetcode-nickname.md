## 1. Problem（用面试口吻复述）

We are given:

* A list of players, each with a `name` and a `nickname`.
* An integer `num_teams`.

We want to assign all players into `num_teams` teams such that:

* For any given nickname, we **avoid putting two players with the same nickname on the same team**.
* In the real input there may be ~1000 players and many teams.

Example:

```text
players = [
  { name: "Andrew Garfield", nickname: "Spiderman" },
  { name: "Brie Larson",    nickname: "Captain"   },
  { name: "Chris Evans",    nickname: "Captain"   },
  { name: "Jeremy Renner",  nickname: "Hawkeye"   },
  { name: "Mark Ruffalo",   nickname: "Hulk"      },
  { name: "Tom Holland",    nickname: "Spiderman" },
]
num_teams = 2

Output:
Team 1: Andrew / Brie / Jeremy   (Spiderman / Captain / Hawkeye)
Team 2: Chris / Mark / Tom       (Captain / Hulk / Spiderman)
```

Spiderman appears twice → one per team;
Captain appears twice → one per team;
Hulk、Hawkeye only once →随便哪个队都行。

---

## 2. Key Insight / Intuition

观察一下约束：

* 冲突 **只发生在相同 nickname 的人之间**；
* 不同 nickname 之间完全没有约束。

所以每个 nickname 对应一个独立的小集合，比如：

* "Spiderman": [Andrew, Tom]
* "Captain":   [Brie, Chris]
* "Hulk":      [Mark]
* "Hawkeye":   [Jeremy]

我们要做的事情非常简单：

> For each nickname group, spread its players across different teams.

只要满足：

```text
count(nickname) <= num_teams
```

就一定可以做到“一队最多一个这个 nickname”。
如果 **有某个 nickname 出现次数 > num_teams**，那不管怎么分，某个队里一定会撞昵称，这是数学上不可能避免的。

这比通用的图染色 / K-coloring 简单很多，因为这里的图是「一堆互不相连的 clique」，每个 clique 只需要把顶点按顺序分配到不同队即可。

---

## 3. Algorithm（可直接讲给面试官）

1. **Group players by nickname.**
   Use a hash map: `nickname -> list of players`.

2. **Feasibility check.**
   For each group:

   * If `group.size > num_teams`, then it's impossible to avoid conflicts for that nickname → return failure / throw.

3. **Assignment.**
   Initialize an array of teams: `teams[0..num_teams-1] = []`.
   For each nickname group:

   * We know `group.size <= num_teams`,
   * So just assign `group[i]` to `teams[i]` for `i = 0..group.size-1`.
   * (If你想更均衡，还可以轮转起始下标，用一个全局指针 `start = (start + 1) % num_teams`.)

4. Return the list of teams.

**Time complexity:**

* Grouping by nickname: **O(N)**
* Feasibility check + assignment: **O(N)**
  Total: **O(N)** time, **O(N)** space — 1000 players scale is完全没问题。

---

## 4. JavaScript Implementation

```js
function assignTeams(players, numTeams) {
  // 1) Group players by nickname
  const groups = new Map(); // nickname -> array of players
  for (const p of players) {
    if (!groups.has(p.nickname)) groups.set(p.nickname, []);
    groups.get(p.nickname).push(p);
  }

  // 2) Feasibility check
  for (const [nick, group] of groups.entries()) {
    if (group.length > numTeams) {
      throw new Error(
        `Impossible to assign: nickname "${nick}" appears ${group.length} times,` +
        ` but only ${numTeams} teams are available.`
      );
    }
  }

  // 3) Initialize teams
  const teams = Array.from({ length: numTeams }, () => []);

  // Optional: to spread load more evenly across teams, keep a rotating start index
  let start = 0;

  // 4) Assign each nickname group across different teams
  for (const group of groups.values()) {
    // Ensure each nickname instance goes to a different team
    for (let i = 0; i < group.length; i++) {
      const teamIndex = (start + i) % numTeams;
      teams[teamIndex].push(group[i]);
    }
    // Move start so next nickname group begins from a different team
    start = (start + 1) % numTeams;
  }

  return teams;
}

// Example usage:
const players = [
  { name: "Andrew Garfield", nickname: "Spiderman" },
  { name: "Brie Larson",     nickname: "Captain"   },
  { name: "Chris Evans",     nickname: "Captain"   },
  { name: "Jeremy Renner",   nickname: "Hawkeye"   },
  { name: "Mark Ruffalo",    nickname: "Hulk"      },
  { name: "Tom Holland",     nickname: "Spiderman" },
];

const result = assignTeams(players, 2);
console.log(
  result.map((team, i) => ({
    team: i + 1,
    players: team.map(p => `${p.name} (${p.nickname})`),
  }))
);
```

---

## 5. 面试口头总结（英文）

你可以这样讲：

> We have players with names and nicknames, and we want to split them into K teams such that players with the same nickname don’t end up on the same team.
>
> The key observation is that the only conflicts come from identical nicknames. So I first group players by nickname using a hash map. For each nickname group, if its size is greater than the number of teams, then the problem is impossible, because by the pigeonhole principle at least one team would have to contain two players with that nickname.
>
> Otherwise, assignment is straightforward. I initialize an array of K teams, and for each nickname group I distribute its players across different teams, for example assigning the i-th player in the group to team i (optionally with a rotating starting index to keep the teams balanced).
>
> This runs in linear time O(N) and uses O(N) extra space, which scales well even for thousands of players and many teams.
