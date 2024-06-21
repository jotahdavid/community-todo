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
    "name" VARCHAR(250) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_task" (
    "category_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "category_task_pkey" PRIMARY KEY ("category_id","task_id")
);

-- CreateTable
CREATE TABLE "player_task" (
    "player_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "player_task_pkey" PRIMARY KEY ("player_id","task_id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_task" ADD CONSTRAINT "category_task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_task" ADD CONSTRAINT "category_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_task" ADD CONSTRAINT "player_task_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_task" ADD CONSTRAINT "player_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
