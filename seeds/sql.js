const dropArticleTableSql = "DROP TABLE IF EXISTS articles";
const dropUserTableSql = "DROP TABLE IF EXISTS user";
const insertArticleTableSql =
  "INSERT INTO articles (id, title, introduction, content, image, author) VALUES (?)";

const insertUserTableSql =
  "INSERT INTO user (id, user_name, user_password, user_email, phone_number) VALUES (?) ";

const createArticleTableSql = `CREATE TABLE articles (
    id CHAR(36) NOT NULL,
    PRIMARY KEY(id),
    title VARCHAR(256),
    introduction TEXT,
    content TEXT, 
    image VARCHAR(2000),
    author VARCHAR(256) 
)`;

const createUserTableSql = `CREATE TABLE user (
  id CHAR(36),
  PRIMARY KEY(id),
  user_name VARCHAR(100),
  user_password VARCHAR(100),
  user_email VARCHAR(100),
  phone_number VARCHAR(15)
)`;

module.exports = {
  dropArticleTableSql,
  dropUserTableSql,
  insertArticleTableSql,
  insertUserTableSql,
  createArticleTableSql,
  createUserTableSql,
};
