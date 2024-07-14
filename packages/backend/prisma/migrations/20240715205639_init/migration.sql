-- CreateTable
CREATE TABLE "RestaurantTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableNo" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "closedAt" DATETIME,
    "restaurantTableId" INTEGER NOT NULL,
    CONSTRAINT "Bill_restaurantTableId_fkey" FOREIGN KEY ("restaurantTableId") REFERENCES "RestaurantTable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "_BillToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BillToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Bill" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BillToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantTable_tableNo_key" ON "RestaurantTable"("tableNo");

-- CreateIndex
CREATE UNIQUE INDEX "_BillToMenuItem_AB_unique" ON "_BillToMenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BillToMenuItem_B_index" ON "_BillToMenuItem"("B");
