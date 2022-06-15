CREATE SCHEMA IF NOT EXISTS `airtime` DEFAULT CHARACTER SET utf8 ;
USE `airtime` ;

CREATE TABLE IF NOT EXISTS `airtime`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `photography` VARCHAR(255) NULL DEFAULT NULL,
  `start_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO airtime.project(id, name, description, photography)
VALUES(1,'airtime: 1', 'desc: 1', 'photo: 1');

CREATE TABLE IF NOT EXISTS `airtime`.`user` (
  `id` VARCHAR(36) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('authentified visitor', 'admin', 'developer', 'project manager') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO airtime.user(id, firstname, lastname, email, password, role)
VALUES('aef4f44f-bbef-11ec-b561-309c23902d82','John', 'Doe', 'johnDoe@hurkan.com', 'bbbhy', 'admin');

CREATE TABLE IF NOT EXISTS `airtime`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  `estimated_time` INT NOT NULL,
  `spent_time_minutes` INT NULL DEFAULT NULL,
  `status` ENUM('to do', 'in progress', 'review', 'completed') NOT NULL,
  `user_id` VARCHAR(36),
  `project_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_project_id_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `airtime`.`project` (`id`),
  CONSTRAINT `fk_ticket_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `airtime`.`user` (`id`)
    );

INSERT INTO airtime.ticket(id, title, comment, estimated_time, spent_time_minutes, status, user_id, project_id)
VALUES(1,'ticket: 1', 'comment: 1', 1, 2, 'to do', 'aef4f44f-bbef-11ec-b561-309c23902d82', 1);

CREATE TABLE IF NOT EXISTS `airtime`.`user_projects` (
  `user_id` VARCHAR(36) NOT NULL,
  `project_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `project_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `project_id_UNIQUE` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `airtime`.`project` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `airtime`.`user` (`id`)
    ON DELETE CASCADE
    );

INSERT INTO airtime.user_projects(user_id, project_id)
VALUES('aef4f44f-bbef-11ec-b561-309c23902d82', 1);