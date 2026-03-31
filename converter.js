import { pdf } from "pdf-to-img";
import fs from "node:fs";

async function conversion() {
  await fs.readdir("./tickets", async (err, files) => {
    const FolderExists = fs.existsSync("./results");

    if (!FolderExists) {
      return;
    }

    await files.forEach(async (ticket) => {
      const doc = await pdf(`./tickets/${ticket}`, { scale: 1 });
      const ticketName = ticket.slice(0, ticket.lastIndexOf("."));

      for await (const img of doc) {
        await fs.writeFile(`./results/${ticketName}.png`, img, (err) => {
          console.log(err);
        });
      }
    });
  });
}

conversion();
