import bcrypt from "bcrypt";

async function createHash() {
  const hash = await bcrypt.hash("123456", 10);
  console.log(hash);
}

createHash();