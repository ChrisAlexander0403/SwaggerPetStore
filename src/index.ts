import { App } from "./app";

(async () => {
    const app = new App(3000);
    await app.listen();
})();