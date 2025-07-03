import AppError from "../../webUtils/AppError.js";
import client from "../index.js";

export const giveMemberVerifyRole = async (userId: string) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  if (!guild) throw new AppError("Could not find the discord server!", 404);

  const member = await guild.members.fetch(userId).catch(console.log);

  if (!member)
    throw new AppError("Could not find you on the discord server!", 404);

  await member.roles.add(process.env.VERIFIED_ROLE_ID);
};
