/*
  Warnings:

  - You are about to drop the column `active` on the `RestaurantTable` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RestaurantTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableNo" INTEGER NOT NULL
);
INSERT INTO "new_RestaurantTable" ("id", "tableNo") SELECT "id", "tableNo" FROM "RestaurantTable";
DROP TABLE "RestaurantTable";
ALTER TABLE "new_RestaurantTable" RENAME TO "RestaurantTable";
CREATE UNIQUE INDEX "RestaurantTable_tableNo_key" ON "RestaurantTable"("tableNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
