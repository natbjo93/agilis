/*\set ON_ERROR_STOP on
drop table if exists profil;
drop table if exists brev;
drop table if exists jobb;
drop table if exists söker;
drop table if exists sparastill;*/
/*  

Connect to database:
C:\Users\natha\OneDrive\Skrivbord\DATABASTEKNIK\pgsql\bin\psql.exe -U ai9707 -d ai9707 -h pgserver.mah.se

Run sql-script to create new database with updates
\i 'C:/Users/natha/desktop/agilis/agilis_databas_tabell.sql'  */

\c ai9707;
DROP DATABASE if exists agilis;
CREATE database agilis;
\c agilis;

create table profil
(email	     varchar(50),
 cid	       varchar(50),
 pid	       varchar(50),
 fnamn       varchar(50),
 enamn       varchar(50),
 losen       varchar(50),
 primary key (email)),
 FOREIGN key (cid) REFERENCES cv(cid));
 FOREIGN key (pid) REFERENCES cv(pid));

 create table cv
 (cid          int,
 email        varchar(50),
 cv           varchar(50),
 PRIMARY key  (cid)),
 FOREIGN key   (email) REFERENCES profil(email));

 CREATE TABLE pb 
 (pid          int,
 email         VARCHAR(50),
 pb            VARCHAR(50),
 primary key   (pid)),
 FOREIGN KEY   (email) REFERENCES profil(email));

/*
create table jobb 
(jobbid          int,
 titel	         varchar(50),
 sistasokdatum	 varchar(50),
 primary key(jobbid));

 create table brev
 (id        int,
  email     varchar(50),
  brev      varchar(200),
  primary key(id)),
  FOREIGN key(email) REFERENCES profil(email));

create table soker
(jobbid      int,
 email	     varchar(50),
 primary key (jobbid, email)),
 FOREIGN key (jobbid) REFERENCES jobb(jobbid));
 FOREIGN key (email) REFERENCES profil(profil));

create table sparastill
(jobbid	     int,
 email	     varchar(50),
 primary key (jobbid, email));

*/

insert into profil values
('petra.svensson@live.se', 'CV', 'Petra', 'Svensson', 'lösen'),
('fo', 'CV', 'Ronja', 'Näckblad', 'ronja'),
('nathaliebjornsson@hotmail.com', 'CV', 'Nathalie', 'Björnsson', 'lösen'),
('patchanasirini@gmai.com', 'CV', 'Patchana', 'Sirini', 'lösen'),

insert into jobb values
(1,'Trädgårdsarbetare', '2019-04-25'),
(2,'MCdonalds', '2019-05-06');
