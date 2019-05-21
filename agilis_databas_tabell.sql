create table profil
(email	     varchar(255),
 cv	         varchar(255),
 first_name  varchar(255),
 last_name   varchar(255),
 losen       varchar(255),
 profile_pic varchar(255),
 primary key (email));

insert into profil values
('petra.svensson@live.se', NULL, 'Petra', 'Svensson', 'lösen', NULL),
('ronja@hotmail.com', NULL, 'Ronja', 'Näckblad', 'ronja', NULL),
('nathaliebjornsson@hotmail.com', NULL, 'Nathalie', 'Björnsson', 'lösen', NULL),
('patchanasirini@gmai.com', NULL, 'Patchana', 'Sirini', 'lösen', NULL);

create table personligabrev
(id          varchar(255),
 email	     varchar(255),
 pb	         varchar(255),
 primary key (id),
 foreign key (email) references profil(email));
/*eventuellt skicka med en url länk för jobbet man har sparat */
create table sparadejobb
(email      varchar(255),
annonsrubrik  varchar(255),
primary key (email, annonsrubrik));
