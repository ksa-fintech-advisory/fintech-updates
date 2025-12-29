-- CreateTable
CREATE TABLE "Update" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL,
    "summaryAr" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "featuredImage" TEXT,
    "content" TEXT NOT NULL,
    "source" TEXT,
    "category" TEXT,
    "references" TEXT,
    "pdfUrl" TEXT,
    "date" DATETIME NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Statistic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "subtitleEn" TEXT NOT NULL,
    "subtitleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "ctaButtons" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Update_slug_key" ON "Update"("slug");

-- CreateIndex
CREATE INDEX "Update_slug_idx" ON "Update"("slug");

-- CreateIndex
CREATE INDEX "Update_featured_idx" ON "Update"("featured");

-- CreateIndex
CREATE INDEX "Update_category_idx" ON "Update"("category");

-- CreateIndex
CREATE INDEX "Statistic_order_idx" ON "Statistic"("order");

-- CreateIndex
CREATE INDEX "Statistic_active_idx" ON "Statistic"("active");

-- CreateIndex
CREATE INDEX "Hero_active_idx" ON "Hero"("active");
