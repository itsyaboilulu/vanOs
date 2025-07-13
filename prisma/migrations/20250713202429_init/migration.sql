-- CreateTable
CREATE TABLE "voltmeter_source" (
    "vs_id" TEXT NOT NULL PRIMARY KEY,
    "vs_name" TEXT NOT NULL,
    "vs_unit" TEXT NOT NULL DEFAULT 'V',
    "vs_location" TEXT,
    "vs_pins" TEXT
);

-- CreateTable
CREATE TABLE "ammeter_source" (
    "as_id" TEXT NOT NULL PRIMARY KEY,
    "as_name" TEXT NOT NULL,
    "as_unit" TEXT NOT NULL DEFAULT 'A',
    "as_location" TEXT,
    "as_pins" TEXT
);

-- CreateTable
CREATE TABLE "voltage_reading" (
    "vr_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vr_source_id" TEXT NOT NULL,
    "vr_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vr_value" REAL NOT NULL,
    CONSTRAINT "voltage_reading_vr_source_id_fkey" FOREIGN KEY ("vr_source_id") REFERENCES "voltmeter_source" ("vs_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "current_reading" (
    "cr_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cr_source_id" TEXT NOT NULL,
    "cr_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cr_value" REAL NOT NULL,
    CONSTRAINT "current_reading_cr_source_id_fkey" FOREIGN KEY ("cr_source_id") REFERENCES "ammeter_source" ("as_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "voltmeter_source_vs_name_key" ON "voltmeter_source"("vs_name");

-- CreateIndex
CREATE UNIQUE INDEX "ammeter_source_as_name_key" ON "ammeter_source"("as_name");
