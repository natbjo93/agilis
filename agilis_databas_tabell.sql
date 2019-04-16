\set ON_ERROR_STOP on
drop table if exists profil;
drop table if exists brev;
drop table if exists jobb;
drop table if exists söker;
drop table if exists sparastill;

create table profil
(email	     varchar(50),
 cv	         varchar(50),
 fnamn       varchar(50),
 Enamn       varchar(50),
 losen       varchar(50),
 primary key (email));

create table jobb 
(jobbid          int,
 titel	         varchar(50),
 sistasokdatum	 varchar(50),
 primary key(jobbid));

 create table brev
 (id        int,
  email     varchar(50),
  namn      varchar(50),
  brev      varchar(200),
  primary key(id));

create table soker
(jobbid      int,
 email	     varchar(50),
 primary key (jobbid, email));

create table sparastill
(jobbid	     int,
 email	     varchar(50),
 primary key (jobbid, email));

insert into profil values
('petra.svensson@live.se', 'CV', 'Petra', 'Svensson', 'lösen'),
('ronja.nackblad@hotmail.com', 'CV', 'Ronja', 'Näckblad', 'ronja'),
('nathaliebjornsson@hotmail.com', 'CV', 'Nathalie', 'Björnsson', 'lösen'),
('patchanasirini@gmai.com', 'CV', 'Patchana', 'Sirini', 'lösen'),
('anasm.abdullai@hotmail.com', 'CV', 'Anas', 'Abdullai', 'lösen');

insert into jobb values
(1,'Trädgårdsarbetare', '2019-04-25'),
(2,'MCdonalds', '2019-05-06');

insert into brev values

insert into sparastill values

insert into soker values

