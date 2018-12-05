export function formatGameType(game_type) {
    if (game_type === 'pingpong') {
      return 'Ping Pong';
    } else if (game_type === 'foosball') {
      return 'Foosball';
    } else {
      return 'Not Specified';
    }
  } 