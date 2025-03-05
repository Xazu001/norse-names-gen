CREATE TABLE `logins` (
	`loginId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`loginEmail` text NOT NULL,
	`loginPassword` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `names` (
	`nameId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nameName` text NOT NULL,
	`gender` text,
	`nameDescription` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text NOT NULL,
	`userLoginId` integer,
	FOREIGN KEY (`userLoginId`) REFERENCES `logins`(`loginId`) ON UPDATE no action ON DELETE no action
);
