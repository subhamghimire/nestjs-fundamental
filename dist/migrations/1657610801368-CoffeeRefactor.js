"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1657610801368 = void 0;
class CoffeeRefactor1657610801368 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffees" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffees" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CoffeeRefactor1657610801368 = CoffeeRefactor1657610801368;
//# sourceMappingURL=1657610801368-CoffeeRefactor.js.map