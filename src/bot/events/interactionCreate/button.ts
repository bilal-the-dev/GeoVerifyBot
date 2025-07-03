import { BaseInteraction, MessageFlags } from "discord.js";
import { handleInteractionError } from "../../botUtils/interaction.js";
import { generateUrlSafeToken } from "../../botUtils/crypto.js";
import User from "../../../database/models/Users.js";

export default async (interaction: BaseInteraction) => {
  try {
    if (!interaction.inCachedGuild()) return;
    if (!interaction.isButton()) return;

    const { customId, user, member } = interaction;

    if (customId !== "verify_button") return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    if (member?.roles.cache.has(process.env.VERIFIED_ROLE_ID))
      throw new Error("You are already verified");

    await User.deleteMany({ userId: user.id }); // delete all old tokens

    const token = generateUrlSafeToken();

    await User.create({ userId: user.id, token });

    await interaction.editReply(
      `Please go [here](${process.env.DOMAIN}/verify?token=${token}) to verify yourselves. If you are not from thailand, your entry will be revoked. Token is valid for 10 minutes.`
    );
  } catch (error) {
    if (error instanceof Error) handleInteractionError(interaction, error);
  }
};
