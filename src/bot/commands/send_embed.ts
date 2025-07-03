import {
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { extendedAPICommand } from "../../typings/interfaces.js";

export default {
  name: "send_embed",
  description: "Send verify embed",
  permissionRequired: PermissionFlagsBits.Administrator,

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.channel?.isSendable()) return;

    await interaction.reply({
      content: "Sending!",
    });

    await interaction.deleteReply();

    const embed = new EmbedBuilder()
      .setTitle("🎯 Verify Yourself")
      .setDescription(
        "Click the button below to verify your identity and gain access to the server."
      )
      .setColor("Blue");

    const button = new ButtonBuilder()
      .setLabel("Verify Now")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("verify_button");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.channel.send({
      embeds: [embed],
      components: [row],
    });
  },
} satisfies extendedAPICommand;
