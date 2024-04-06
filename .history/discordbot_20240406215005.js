const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const QRCode = require("qrcode");
const { Keypair } = require("@solana/web3.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fund-sol-wallet")
    .setDescription(
      "Generate a QR code to fund a new Solana wallet with a specified amount"
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("How much would you like to fund your wallet with?")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const amount = interaction.options.getNumber("amount");

    const wallet = Keypair.generate();

    const secretKey = wallet.secretKey.toString("base58");

    const publicKey = wallet.publicKey.toBase58();

    const qrCodeData = `solana:${publicKey}?amount=${amount}`;

    QRCode.toDataURL(qrCodeData, async (err, url) => {
      if (err) {
        console.error(err);
        await interaction.editReply({ content: "Failed to generate QR code." });
        return;
      }

      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Fund Solana Wallet")
        .setDescription(
          `Scan this QR code to send ${amount} SOL to the address: \`${publicKey}\``
        )
        .setImage(url);

      // In a secure system, you'd handle the secret key very carefully
      // Here we log it to the console just for example purposes
      console.log(`Secret key for ${publicKey}: ${secretKey}`);

      await interaction.editReply({ embeds: [embed] });

      // IMPORTANT: The private key should be handled securely.
    });
  },
};
