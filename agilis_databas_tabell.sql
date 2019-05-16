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
 cv	         varchar(50),
 first_name  varchar(50),
 last_name   varchar(50),
 losen       varchar(50),
 primary key (email));

insert into profil values
('petra.svensson@live.se', NULL, 'Petra', 'Svensson', 'lösen'),
('fo', NULL, 'Ronja', 'Näckblad', 'ronja'),
('nathaliebjornsson@hotmail.com', NULL, 'Nathalie', 'Björnsson', 'lösen'),
('patchanasirini@gmai.com', NULL, 'Patchana', 'Sirini', 'lösen'),
