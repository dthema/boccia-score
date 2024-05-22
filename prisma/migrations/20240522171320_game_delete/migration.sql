-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_blueAthleteId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_redAthleteId_fkey";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_redAthleteId_fkey" FOREIGN KEY ("redAthleteId") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_blueAthleteId_fkey" FOREIGN KEY ("blueAthleteId") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;
