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

/*Tips! Fundera på om alla id går serialisera. Kolla upp datatypen serial*/

create table profil
(email	     varchar(50),
 cv	         varchar(50),
 fnamn       varchar(50),
 enamn       varchar(50),
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
  brev      varchar(200),
  primary key(id)),
  FOREIGN key(email) REFERENCES profil(email));

/*Måste vara främmande nycklar till relevanta tabeller. Ex jobb-id måste vara kopplat till jobb-tabell*/
create table soker
(jobbid      int,
 email	     varchar(50),
 primary key (jobbid, email)),
 FOREIGN key (jobbid) REFERENCES jobb(jobbid));
 FOREIGN key (email) REFERENCES profil(profil));


 /*Vad används denna till? Varför är de likadana?*/
create table sparastill
(jobbid	     int,
 email	     varchar(50),
 primary key (jobbid, email));

insert into profil values
('petra.svensson@live.se', 'CV', 'Petra', 'Svensson', 'lösen'),
('fo', 'CV', 'Ronja', 'Näckblad', 'ronja'),
('nathaliebjornsson@hotmail.com', 'CV', 'Nathalie', 'Björnsson', 'lösen'),
('patchanasirini@gmai.com', 'CV', 'Patchana', 'Sirini', 'lösen'),

insert into jobb values
(1,'Trädgårdsarbetare', '2019-04-25'),
(2,'MCdonalds', '2019-05-06');

/*
insert into brev values

insert into sparastill values

insert into soker values
*/
