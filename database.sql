CREATE DATABASE IF NOT EXISTS RogaLabs;

USE RogaLabs;

CREATE TABLE Pessoa(
id  int(255) auto_increment not null,
nome varchar(255) not null,
nome_mae varchar(255) not null,
nome_pai varchar(255),
cep varchar(8) not null, 
data_nascimento DATE, 
data_cadastro DATETIME, 
data_edicao TIMESTAMP,
CONSTRAINT pk_pessoa PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE Anotação(
id  int(255) auto_increment not null,
id_pessoa int(255) not null,
titulo varchar(255) not null, 
descricao text(2000),
data_cadastro DATETIME, 
data_edicao TIMESTAMP,
CONSTRAINT pk_anotação PRIMARY KEY(id),
CONSTRAINT fk_pessoa FOREIGN KEY(id_pessoa) REFERENCES Pessoa(id)
)ENGINE=InnoDb;


INSERT INTO Pessoa VALUES(null, 'Felipe Tanto', 'Emilia Lopez', '', 59178000, '1992-05-02', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO Pessoa VALUES(null, 'Nahuel Saez', 'Claudia Pedri', '', 59178000, '1992-05-02', CURRENT_TIME());
