DROP TABLE IF EXISTS user_session;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS rounds;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

CREATE TABLE user_session(
    session_id INT GENERATED ALWAYS AS IDENTITY,
    session_token CHAR(20) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE games(
    game_id INT GENERATED ALWAYS AS IDENTITY,
    creator_id INT NOT NULL,
    level INT NOT NULL,
    join_code VARCHAR NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    PRIMARY KEY (game_id),
    FOREIGN KEY (creator_id) REFERENCES users(user_id)
);

CREATE TABLE rounds(
    round_id INT GENERATED ALWAYS AS IDENTITY,
    topic VARCHAR NOT NULL,
    game_id INT NOT NULL,
    PRIMARY KEY (round_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE scores(
    score_id INT GENERATED ALWAYS AS IDENTITY,
    score INT NOT NULL,
    round_id INT NOT NULL,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(score_id),
    FOREIGN KEY(round_id) REFERENCES rounds(round_id),
    FOREIGN KEY(game_id) REFERENCES games(game_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);