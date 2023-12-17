import { clearPage, renderPageTitle } from '../../utils/render';


async function fetchUsers() {
  try {
    
    const response = await fetch(`${process.env.API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // eslint-disable-next-line no-plusplus
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].username === 'admin') {
        data.splice(i, 1);
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
  return [];

}
async function  LeaderBoardPage  () {

  const dataNonTrie = await fetchUsers();

  const leaderboardData = dataNonTrie.sort(
    ((a, b) =>
       (b.score)- (a.score)),
  );
  function renderLeaderBoardPage() {
    const main = document.querySelector('main');
    let rank = 0;
    main.innerHTML = `
      <table class="leaderboard">
          <thead>
              <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
              </tr>
          </thead>
          <tbody>
              ${leaderboardData
                .map((player) => {
                  rank += 1;
                  return `
                  <tr>
                      <td>${rank}</td>
                      <td>${player.username}</td>
                      <td>${player.score}</td>
                  </tr>
              `;
                })
                .join('')}
          </tbody>
      </table>`;
  }
  
  clearPage();
  console.log('clear page');
  renderPageTitle('Register');
  renderLeaderBoardPage();
};


export default LeaderBoardPage;