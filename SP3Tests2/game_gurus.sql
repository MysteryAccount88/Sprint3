
-- Drop tables if they exist
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Tips;
DROP TABLE IF EXISTS Game_Category;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Users;

-- Create Users table
CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('guest', 'user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  UNIQUE KEY (username)
);

-- Create Games table
CREATE TABLE Games (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  platform VARCHAR(100),
  release_date DATE,
  image_url VARCHAR(255),
  PRIMARY KEY (id)
);

-- Create Categories table
CREATE TABLE Categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (name)
);

-- Create Game_Category junction table
CREATE TABLE Game_Category (
  game_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (game_id, category_id),
  FOREIGN KEY (game_id) REFERENCES Games(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
);

-- Create Tips table
CREATE TABLE Tips (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (game_id) REFERENCES Games(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Comments table
CREATE TABLE Comments (
  id INT NOT NULL AUTO_INCREMENT,
  content TEXT NOT NULL,
  tip_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (tip_id) REFERENCES Tips(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Insert sample data for Users
INSERT INTO Users (username, email, password, role) VALUES
('admin', 'admin@gamegurus.com', 'password', 'admin'),
('gamer1', 'gamer1@example.com', 'password', 'user'),
('proGamer', 'pro@example.com', 'password', 'user');

-- Insert sample data for Categories
INSERT INTO Categories (name) VALUES
('Action'),
('Adventure'),
('RPG'),
('Strategy'),
('Sports'),
('Shooter');

-- Insert sample data for Games
INSERT INTO Games (title, description, platform, release_date) VALUES
('The Legend of Zelda', 'An open-world action-adventure game', 'Nintendo Switch', '2017-03-03'),
('Elden Ring', 'An action RPG by FromSoftware', 'PlayStation, Xbox, PC', '2022-02-25'),
('FIFA 23', 'A football simulation game', 'PlayStation, Xbox, PC', '2022-09-30'),
('Call of Duty', 'A first-person shooter game', 'PlayStation, Xbox, PC', '2022-10-28');

-- Link games to categories
INSERT INTO Game_Category (game_id, category_id) VALUES
(1, 1), -- Zelda: Action
(1, 2), -- Zelda: Adventure
(2, 1), -- Elden Ring: Action
(2, 3), -- Elden Ring: RPG
(3, 5), -- FIFA 23: Sports
(4, 6); -- CoD: Shooter

-- Insert sample tips
INSERT INTO Tips (title, content, game_id, user_id) VALUES
('Cooking Guide', 'Combine food ingredients to create dishes that restore health.', 1, 2),
('Boss Strategy', 'For the Margit boss fight, use the Jellyfish Spirit summon.', 2, 3),
('Skill Moves', 'Master the ball roll by flicking the right stick.', 3, 2),
('Weapon Loadout', 'The M4 with a suppressor is great for stealth missions.', 4, 3);

-- Insert sample comments
INSERT INTO Comments (content, tip_id, user_id) VALUES
('This really helped me defeat the boss!', 2, 2),
('The ball roll is essential for higher difficulty.', 3, 3);