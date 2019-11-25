CREATE TABLE branch
(
 	b_id varchar(10),
    b_name varchar(10),
    b_hod varchar(10),
    PRIMARY key(b_id)
);


CREATE TABLE student
(
	s_id varchar(10),
    s_name varchar(30),
    s_father varchar(30),
    s_mother varchar(30),
    s_gender char(2),
    b_id varchar(10),
    foreign key(b_id)REFERENCES branch(b_id),
    s_dob date,
    s_phone int(10),
    s_sslc varchar(255),
    s_puc varchar(255),
    s_graduation varchar(255),
    s_pass int(5),
    PRIMARY KEY(s_id)
);

create TABLE company
(
	c_id varchar(20),
    c_name varchar(50),
    c_location varchar(30),
    c_type varchar(30),
    PRIMARY KEY(c_id)
);

create table placed
(
    pl_id varchar(10),
    primary KEY(pl_id),
    s_id varchar(10),
    foreign key(s_id)REFERENCES student(s_id),
    b_id varchar(10),
      foreign KEY(b_id)REFERENCES branch(b_id),
    c_id varchar(10),
        foreign KEY(c_id)REFERENCES company(c_id),
    pl_package varchar(255),
    pl_status varchar(20)
);

CREATE TABLE booking
(
	bg_id varchar(50),
    primary key(bg_id),
    s_id varchar(20),
    bg_name varchar(50),
    bg_phone int(10),
    FOREIGN KEY(s_id)REFERENCES student(s_id)
);

CREATE TABLE req_time
(
	id int,
    exec_time time,
    PRIMARY KEY(id)
);


ALTER TABLE req_time
MODIFY id int not null AUTO_INCREMENT;

CREATE TRIGGER user_trig AFTER INSERT on booking for EACH row
INSERT INTO req_time(exec_time)values(Now());