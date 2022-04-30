# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.7.35-log)
# Database: byzer_as_form
# Generation Time: 2022-02-17 08:53:24 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table api_nav
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api_nav`;

CREATE TABLE `api_nav` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT '',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table api_nav_item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api_nav_item`;

CREATE TABLE `api_nav_item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `action` varchar(256) DEFAULT NULL,
  `api_nav_id` int(11) DEFAULT NULL,
  `step` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table dict_store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dict_store`;

CREATE TABLE `dict_store` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `value` text,
  `dict_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table home_config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `home_config`;

CREATE TABLE `home_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int(11) DEFAULT NULL,
  `k` varchar(255) DEFAULT NULL,
  `v` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table lang
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lang`;

CREATE TABLE `lang` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lang_key_id` int(11) DEFAULT NULL,
  `lang_name` varchar(256) DEFAULT NULL,
  `lang_value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table lang_key
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lang_key`;

CREATE TABLE `lang_key` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table plugin_store_item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `plugin_store_item`;

CREATE TABLE `plugin_store_item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `main_class` varchar(255) DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `version` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `plugin_type` int(11) DEFAULT NULL,
  `img` char(255) CHARACTER SET utf8 DEFAULT NULL,
  `downloads` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `extra_params` text CHARACTER SET utf8,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table plugin_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `plugin_user`;

CREATE TABLE `plugin_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `plugin_id` int(11) DEFAULT NULL,
  `relate_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `plugin_id` (`plugin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table python_script
# ------------------------------------------------------------

DROP TABLE IF EXISTS `python_script`;

CREATE TABLE `python_script` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `code` text,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource`;

CREATE TABLE `resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `team_id` (`team_id`),
  KEY `team_id_2` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table role_resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_resource`;

CREATE TABLE `role_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `resource_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `resource_id` (`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table script_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `script_file`;

CREATE TABLE `script_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `has_caret` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_dir` int(11) DEFAULT NULL,
  `content` text,
  `is_expanded` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table script_user_rw
# ------------------------------------------------------------

DROP TABLE IF EXISTS `script_user_rw`;

CREATE TABLE `script_user_rw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `script_file_id` int(11) DEFAULT NULL,
  `mlsql_user_id` int(11) DEFAULT NULL,
  `is_owner` int(11) DEFAULT NULL,
  `readable` int(11) DEFAULT NULL,
  `writable` int(11) DEFAULT NULL,
  `is_delete` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `script_file_id` (`script_file_id`),
  KEY `mlsql_user_id` (`mlsql_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table team
# ------------------------------------------------------------

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `activated` int(11) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user_login_tracker
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_login_tracker`;

CREATE TABLE `user_login_tracker` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `created_time` bigint(20) DEFAULT NULL,
  `fails` int(11) DEFAULT NULL,
  `lock_time` bigint(20) DEFAULT NULL,
  `updated_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user_resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_resource`;

CREATE TABLE `user_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `resource_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `resource_id` (`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_session`;

CREATE TABLE `user_session` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `session` text,
  `create_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
