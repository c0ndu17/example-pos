/*
  Warnings:

  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `email` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `MenuItem` table. All the data in the column will be lost.
  - Added the required column `restaurantTableId` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Table";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RestaurantTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableNo" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Auth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Auth" ("id", "password") SELECT "id", "password" FROM "Auth";
DROP TABLE "Auth";
ALTER TABLE "new_Auth" RENAME TO "Auth";
CREATE TABLE "new_Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "closedAt" DATETIME,
    "restaurantTableId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Bill_restaurantTableId_fkey" FOREIGN KEY ("restaurantTableId") REFERENCES "RestaurantTable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bill" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Bill";
DROP TABLE "Bill";
ALTER TABLE "new_Bill" RENAME TO "Bill";
CREATE TABLE "new_MenuItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_MenuItem" ("id", "name", "price") SELECT "id", "name", "price" FROM "MenuItem";
DROP TABLE "MenuItem";
ALTER TABLE "new_MenuItem" RENAME TO "MenuItem";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "email" TEXT NOT NULL,
    "authId" INTEGER NOT NULL,
    CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("authId", "createdAt", "id", "updatedAt") SELECT "authId", "createdAt", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
