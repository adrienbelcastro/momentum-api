module.exports.dropArticleTableSql = "DROP TABLE IF EXISTS articles";
module.exports.dropUserTableSql = "DROP TABLE IF EXISTS user";
module.exports.insertArticleTableSql =
  "INSERT INTO articles (id, title, introduction, content, image, author) VALUES ?";
module.exports.insertUserTableSql =
  "INSERT INTO articles (id, user_name, user_password, user_email, phone_number) VALUES ?";

module.exports.createArticleTableSql = `CREATE TABLE articles (
    id CHAR(36) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    title VARCHAR(256),
    introduction TEXT,
    content TEXT, 
    image VARCHAR(2000),
    author VARCHAR(256)
)`;

module.exports.createUserTableSql = `CREATE TABLE user (
  id CHAR(36) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(id),
  user_name VARCHAR(100),
  user_password VARCHAR(100),
  user_email VARCHAR(100),
  phone_number VARCHAR(15)
)`;
