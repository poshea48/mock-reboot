const players = [
  { name: 'Christian McCaffrey', team: 'Panthers', pos: 'RB' },
  { name: 'Saquon Barkley', team: 'Giants', pos: 'RB' },
  { name: 'Ezekiel Elliott', team: 'Cowboys', pos: 'RB' },
  { name: 'Michael Thomas', team: 'Saints', pos: 'WR' },
  { name: 'Clyde Edwards-Helaire', team: 'Chiefs', pos: 'RB' },
  { name: 'Miles Sanders', team: 'Eagles', pos: 'RB' },
  { name: 'Kenyan Drake', team: 'Cardinals', pos: 'RB' },
  { name: 'Josh Jacobs', team: 'Raiders', pos: 'RB' },
  { name: 'Nick Chubb', team: 'Browns', pos: 'RB' },
  { name: 'Joe Mixon', team: 'Bengals', pos: 'RB' },
  { name: 'Aaron Jones', team: 'Packers', pos: 'RB' },
  { name: 'DeAndre Hopkins', team: 'Cardinals', pos: 'WR' },
  { name: 'Julio Jones', team: 'Falcons', pos: 'WR' },
  { name: 'Cooper Kupp', team: 'Rams', pos: 'WR' },
  { name: 'Amari Cooper', team: 'Cowboys', pos: 'WR' },
  { name: 'Odell Beckham Jr.', team: 'Browns', pos: 'WR' },
  { name: 'JuJu Smith-Schuster', team: 'Steelers', pos: 'WR' },
  { name: 'George Kittle', team: '49ers', pos: 'TE' },
  { name: 'Travis Kelce', team: 'Chiefs', pos: 'TE' },
  { name: 'Adam Thielen', team: 'Vikings', pos: 'WR' },
  { name: 'Chris Carson', team: 'Seahawks', pos: 'RB' },
  { name: 'Kenny Golladay', team: 'Lions', pos: 'WR' },
  { name: 'Mike Evans', team: 'Buccaneers', pos: 'WR' },
  { name: 'Keenan Allen', team: 'Chargers', pos: 'WR' },
  { name: 'Le’Veon Bell', team: 'Jets', pos: 'RB' },
  { name: 'Leonard Fournette', team: 'Buccaneers', pos: 'RB' },
  { name: 'James Conner', team: 'Steelers', pos: 'RB' },
  { name: 'Tyler Lockett', team: 'Seahawks', pos: 'WR' },
  { name: 'Courtland Sutton', team: 'Broncos', pos: 'WR' },
  { name: 'D.J. Moore', team: 'Panthers', pos: 'WR' },
  { name: 'Zach Ertz', team: 'Eagles', pos: 'TE' },
  { name: 'Todd Gurley', team: 'Falcons', pos: 'RB' },
  { name: 'David Johnson', team: 'Texans', pos: 'RB' },
  { name: 'Devin Singletary', team: 'Bills', pos: 'RB' },
  { name: 'A.J. Brown', team: 'Titans', pos: 'WR' },
  { name: 'DJ Chark', team: 'Jaguars', pos: 'WR' },
  { name: 'David Montgomery', team: 'Bears', pos: 'RB' },
  { name: 'JK Dobbins', team: 'Ravens', pos: 'RB' },
  { name: 'Robert Woods', team: 'Rams', pos: 'WR' },
  { name: 'Allen Robinson', team: 'Bears', pos: 'WR' },
  { name: 'Stefon Diggs', team: 'Bills', pos: 'WR' },
  { name: 'Mark Ingram', team: 'Ravens', pos: 'RB' },
  { name: 'Cam Akers', team: 'Rams', pos: 'RB' },
  { name: 'Raheem Mostert', team: '49ers', pos: 'RB' },
  { name: 'DeVante Parker', team: 'Dolphins', pos: 'WR' },
  { name: 'Russell Wilson', team: 'Seahawks', pos: 'QB' },
  { name: 'Kyler Murray', team: 'Cardinals', pos: 'QB' },
  { name: 'Deshaun Watson', team: 'Texans', pos: 'QB' },
  { name: 'Darren Waller', team: 'Raiders', pos: 'TE' },
  { name: 'Evan Engram', team: 'Giants', pos: 'TE' },
  { name: 'Hunter Henry', team: 'Chargers', pos: 'TE' },
  { name: 'Jonathan Taylor', team: 'Colts', pos: 'RB' },
  { name: 'Calvin Ridley', team: 'Falcons', pos: 'WR' },
  { name: "D'Andre Swift", team: 'Lions', pos: 'RB' },
  { name: 'Jarvis Landry', team: 'Browns', pos: 'WR' },
  { name: 'Melvin Gordon', team: 'Broncos', pos: 'RB' },
  { name: 'Julian Edelman', team: 'Patriots', pos: 'WR' },
  { name: 'Tevin Coleman', team: '49ers', pos: 'RB' },
  { name: 'Kareem Hunt', team: 'Browns', pos: 'RB' },
  { name: 'Hayden Hurst', team: 'Falcons', pos: 'TE' },
  { name: 'Mark Andrews', team: 'Ravens', pos: 'TE' },
  { name: 'Emmanuel Sanders', team: 'Saints', pos: 'WR' },
  { name: 'T.Y. Hilton', team: 'Colts', pos: 'WR' },
  { name: 'Dak Prescott', team: 'Cowboys', pos: 'QB' },
  { name: 'Josh Allen', team: 'Bills', pos: 'QB' },
  { name: 'Terry McLaurin', team: 'Washington', pos: 'WR' },
  { name: 'DK Metcalf', team: 'Seahawks', pos: 'WR' },
  { name: 'James White', team: 'Patriots', pos: 'RB' },
  { name: 'Antonio Gibson', team: 'Washington', pos: 'RB' },
  { name: 'Matt Ryan', team: 'Falcons', pos: 'QB' },
  { name: 'Phillip Lindsay', team: 'Broncos', pos: 'RB' },
  { name: 'Marlon Mack', team: 'Colts', pos: 'RB' },
  { name: 'Will Fuller V', team: 'Texans', pos: 'WR' },
  { name: 'Marquise Brown', team: 'Ravens', pos: 'WR' },
  { name: 'Carson Wentz', team: 'Eagles', pos: 'QB' },
  { name: 'Drew Brees', team: 'Saints', pos: 'QB' },
  { name: 'Aaron Rodgers', team: 'Packers', pos: 'QB' },
  { name: 'Tyler Boyd', team: 'Bengals', pos: 'WR' },
  { name: 'Tyler Higbee', team: 'Rams', pos: 'TE' },
  { name: 'Brandin Cooks', team: 'Texans', pos: 'WR' },
  { name: 'John Brown', team: 'Bills', pos: 'WR' },
  { name: 'Christian Kirk', team: 'Cardinals', pos: 'WR' },
  { name: 'Jonnu Smith', team: 'Titans', pos: 'TE' },
  { name: 'Austin Hooper', team: 'Browns', pos: 'TE' },
  { name: 'Golden Tate', team: 'Giants', pos: 'WR' },
  { name: 'Kerryon Johnson', team: 'Lions', pos: 'RB' },
  { name: 'Matt Breida', team: 'Dolphins', pos: 'RB' },
  { name: 'Tarik Cohen', team: 'Bears', pos: 'RB' },
  { name: 'Duke Johnson', team: 'Texans', pos: 'RB' },
  { name: 'Tom Brady', team: 'Buccaneers', pos: 'QB' },
  { name: 'Chris Thompson', team: 'Jaguars', pos: 'RB' },
  { name: 'Boston Scott', team: 'Eagles', pos: 'RB' },
  { name: 'Zack Moss', team: 'Bills', pos: 'RB' },
  { name: 'Sony Michel', team: 'Patriots', pos: 'RB' },
  { name: 'Daniel Jones', team: 'Giants', pos: 'QB' },
  { name: 'Ben Roethlisberger', team: 'Steelers', pos: 'QB' },
  { name: 'Jamison Crowder', team: 'Jets', pos: 'WR' },
  { name: 'Jack Doyle', team: 'Colts', pos: 'TE' },
  { name: 'Jordan Howard', team: 'Dolphins', pos: 'RB' },
  { name: 'Baker Mayfield', team: 'Browns', pos: 'QB' },
  { name: 'Latavius Murray', team: 'Saints', pos: 'RB' },
  { name: 'Deebo Samuel', team: '49ers', pos: 'WR' },
  { name: 'Darrell Henderson', team: 'Rams', pos: 'RB' },
  { name: 'A.J. Green', team: 'Bengals', pos: 'WR' },
  { name: 'Marvin Jones', team: 'Lions', pos: 'WR' },
  { name: 'Michael Gallup', team: 'Cowboys', pos: 'WR' },
  { name: 'Alexander Mattison', team: 'Vikings', pos: 'RB' },
  { name: 'Darrel Williams', team: 'Chiefs', pos: 'RB' },
  { name: 'Diontae Johnson', team: 'Steelers', pos: 'WR' },
  { name: 'Darius Slayton', team: 'Giants', pos: 'WR' },
  { name: 'Eric Ebron', team: 'Steelers', pos: 'TE' },
  { name: 'Ryquell Armstead', team: 'Jaguars', pos: 'RB' },
  { name: 'Jared Goff', team: 'Rams', pos: 'QB' },
  { name: 'Chase Edmonds', team: 'Cardinals', pos: 'RB' },
  { name: 'DeSean Jackson', team: 'Eagles', pos: 'WR' },
  { name: 'Mike Williams', team: 'Chargers', pos: 'WR' },
  { name: 'Anthony Miller', team: 'Bears', pos: 'WR' },
  { name: 'Matthew Stafford', team: 'Lions', pos: 'QB' },
  { name: 'Cam Newton', team: 'Patriots', pos: 'QB' },
  { name: 'CeeDee Lamb', team: 'Cowboys', pos: 'WR' },
  { name: 'San Francisco 49ers', team: 'D/ST', pos: '$3' },
  { name: 'Pittsburgh Steelers', team: 'D/ST', pos: '$3' },
  { name: 'Sterling Shepard', team: 'Giants', pos: 'WR' },
  { name: 'Curtis Samuel', team: 'Panthers', pos: 'WR' },
  { name: 'Ito Smith', team: 'Falcons', pos: 'RB' },
  { name: 'Justin Jackson', team: 'Chargers', pos: 'RB' },
  { name: 'Mecole Hardman', team: 'Chiefs', pos: 'WR' },
  { name: 'Jared Cook', team: 'Saints', pos: 'TE' },
  { name: 'Jerick McKinnon', team: '49ers', pos: 'RB' },
  { name: 'Jalen Richard', team: 'Raiders', pos: 'RB' },
  { name: 'Henry Ruggs III', team: 'Raiders', pos: 'WR' },
  { name: 'Jerry Jeudy', team: 'Broncos', pos: 'WR' },
  { name: 'New England Patriots', team: 'D/ST', pos: '$3' },
  { name: 'Chicago Bears', team: 'D/ST', pos: '$3' },
  { name: 'Baltimore Ravens', team: 'D/ST', pos: '$3' },
  { name: 'Devine Ozigbo', team: 'Jaguars', pos: 'RB' },
  { name: 'Joshua Kelley', team: 'Chargers', pos: 'RB' },
  { name: "N'Keal Harry", team: 'Patriots', pos: 'WR' },
  { name: 'Joe Burrow', team: 'Bengals', pos: 'QB' },
  { name: 'Buffalo Bills', team: 'D/ST', pos: '$3' },
  { name: 'Minnesota Vikings', team: 'D/ST', pos: '$3' },
  { name: 'Preston Williams', team: 'Dolphins', pos: 'WR' },
  { name: 'Allen Lazard', team: 'Packers', pos: 'WR' },
  { name: 'Justin Jefferson', team: 'Vikings', pos: 'WR' },
  { name: 'Van Jefferson', team: 'Rams', pos: 'WR' },
  { name: 'T.J. Hockenson', team: 'Lions', pos: 'TE' },
  { name: 'Mike Gesicki', team: 'Dolphins', pos: 'TE' },
  { name: 'Rob Gronkowski', team: 'Buccaneers', pos: 'TE' },
  { name: 'Larry Fitzgerald', team: 'Cardinals', pos: 'WR' },
  { name: 'Michael Pittman Jr.', team: 'Colts', pos: 'WR' },
  { name: 'Noah Fant', team: 'Broncos', pos: 'TE' },
  { name: 'Tony Pollard', team: 'Cowboys', pos: 'RB' },
  { name: 'Kansas City Chiefs', team: 'D/ST', pos: '$3' },
  { name: 'Los Angeles Chargers', team: 'D/ST', pos: '$3' },
  { name: 'Nyheim Hines', team: 'Colts', pos: 'RB' },
  { name: 'New Orleans Saints', team: 'D/ST', pos: '$3' },
  { name: 'Denver Broncos', team: 'D/ST', pos: '$3' },
  { name: 'Los Angeles Rams', team: 'D/ST', pos: '$3' },
  { name: 'Ryan Tannehill', team: 'Titans', pos: 'QB' },
  { name: 'Darrynton Evans', team: 'Titans', pos: 'RB' },
  { name: 'James Robinson', team: 'Jaguars', pos: 'RB' },
  { name: 'Carlos Hyde', team: 'Seahawks', pos: 'RB' },
  { name: 'Malcolm Brown', team: 'Rams', pos: 'RB' },
  { name: 'Hunter Renfrow', team: 'Raiders', pos: 'WR' },
  { name: 'Chris Herndon', team: 'Jets', pos: 'TE' },
  { name: 'Cole Beasley', team: 'Bills', pos: 'WR' },
  { name: 'Dede Westbrook', team: 'Jaguars', pos: 'WR' },
  { name: 'JJ Arcega-Whiteside', team: 'Eagles', pos: 'WR' },
  { name: 'Robby Anderson', team: 'Panthers', pos: 'WR' },
  { name: 'Breshad Perriman', team: 'Jets', pos: 'WR' },
  { name: 'Blake Jarwin', team: 'Cowboys', pos: 'TE' },
  { name: 'Dallas Goedert', team: 'Eagles', pos: 'TE' },
  { name: 'Ian Thomas', team: 'Panthers', pos: 'TE' },
  { name: 'Jimmy Garoppolo', team: '49ers', pos: 'QB' },
  { name: 'Jamaal Williams', team: 'Packers', pos: 'RB' },
  { name: 'Giovani Bernard', team: 'Bengals', pos: 'RB' },
  { name: 'Bryce Love', team: 'Washington', pos: 'RB' },
  { name: 'Damien Harris', team: 'Patriots', pos: 'RB' },
  { name: 'Seattle Seahawks', team: 'D/ST', pos: '$3' },
  { name: 'Justin Tucker', team: 'Ravens', pos: 'K' },
  { name: 'Greg Zuerlein', team: 'Cowboys', pos: 'K' },
  { name: 'Michael Badgley', team: 'Chargers', pos: 'K' },
  { name: 'Harrison Butker', team: 'Chiefs', pos: 'K' },
  { name: 'Wil Lutz', team: 'Saints', pos: 'K' },
  { name: 'Zane Gonzalez', team: 'Cardinals', pos: 'K' },
  { name: 'Joey Slye', team: 'Panthers', pos: 'K' },
  { name: 'Younghoe Koo', team: 'Falcons', pos: 'K' },
  { name: 'Matt Prater', team: 'Lions', pos: 'K' },
  { name: 'Brandon McManus', team: 'Broncos', pos: 'K' },
  { name: 'Ryan Succop', team: 'Buccaneers', pos: 'K' },
  { name: 'Dan Bailey', team: 'Vikings', pos: 'K' },
];

export default players;