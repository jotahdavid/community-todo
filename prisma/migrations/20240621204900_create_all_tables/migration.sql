-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToTask_AB_unique" ON "_PlayerToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTask_B_index" ON "_PlayerToTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTask_AB_unique" ON "_CategoryToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTask_B_index" ON "_CategoryToTask"("B");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTask" ADD CONSTRAINT "_PlayerToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTask" ADD CONSTRAINT "_PlayerToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTask" ADD CONSTRAINT "_CategoryToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTask" ADD CONSTRAINT "_CategoryToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
