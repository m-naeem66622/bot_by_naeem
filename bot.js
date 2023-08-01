require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const myIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
];

const client = new Client({ intents: myIntents });

const token = process.env.TOKEN;
client.on("ready", () => {
  console.log("Bot is ready!");
});

let rolesMessageID = "1135441397038727240";

client.on("messageCreate", (message) => {
  try {
    // Ignore messages from other bots or from itself
    if (message.author?.bot || message.author?.id === client.user?.id) return;

    // Define a prefix for commands
    const prefix = "!";

    // Check if the message starts with the prefix
    if (message.content?.startsWith(prefix)) {
      // Get the command name and arguments
      const args = message.content?.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      // Handle different commands
      switch (command) {
        case "ping":
          // Reply with pong
          message.reply("pong");
          break;
        case "hello":
          // Reply with hello
          message.reply("hello");
          break;
        case "roles":
          // Send a message with role buttons in the roles channel and store its ID
          const rolesChannel = message.guild.channels.cache.find(
            (channel) => channel.name === "get-roles"
          );
          if (!rolesChannel)
            return message.reply("There is no roles channel in this server");

          // Create buttons for each role
          const bugResolverButton = new ButtonBuilder()
            .setCustomId("bug-resolver")
            .setLabel("Bug Resolver")
            .setStyle("Primary");

          const expressjsButton = new ButtonBuilder()
            .setCustomId("expressjs")
            .setLabel("Express.js")
            .setStyle("Primary");

          const mongoButton = new ButtonBuilder()
            .setCustomId("mongo")
            .setLabel("MongoDB/Mongoose")
            .setStyle("Primary");

          const reactButton = new ButtonBuilder()
            .setCustomId("react")
            .setLabel("React")
            .setStyle("Primary");

          const reduxButton = new ButtonBuilder()
            .setCustomId("redux")
            .setLabel("Redux")
            .setStyle("Primary");

          const tailwindcssButton = new ButtonBuilder()
            .setCustomId("tailwindcss")
            .setLabel("Tailwind CSS")
            .setStyle("Primary");

          // Create an action row for each pair of buttons
          const row1 = new ActionRowBuilder().addComponents(
            bugResolverButton,
            expressjsButton,
            mongoButton
          );
          const row2 = new ActionRowBuilder().addComponents(
            reactButton,
            reduxButton,
            tailwindcssButton
          );

          // Send the message with the buttons in the roles channel
          rolesChannel
            .send({
              content: "Click on a button to get a role",
              components: [row1, row2],
            })
            .then((sentMessage) => {
              // Save the message ID in a variable or a file for later use
              rolesMessageID = sentMessage.id;
            });
          break;

        default:
          // Reply with an error message
          message.reply("invalid command");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// Listen for interactionCreate event
client.on("interactionCreate", async (interaction) => {
  let action; // Declare a variable to store the action

  try {
    // Check if the interaction is a button click
    if (interaction.isButton()) {
      // Check if the button is on the roles message
      if (interaction.message.id === rolesMessageID) {
        // Get the guild and the member who clicked the button
        const guild = interaction.guild;
        const member = interaction.member;

        // Check which button was clicked and assign or remove the corresponding role
        switch (interaction.customId) {
          case "bug-resolver":
            // Bug Resolver role
            let bugResolverRole = guild.roles.cache.find(
              (role) => role.id === process.env.bugResolverRoleID
            );
            if (member.roles.cache.has(bugResolverRole.id)) {
              // Remove the role and send a private message to the user
              member.roles.remove(bugResolverRole);
              action = "Removed"; // Set the action to removed
            } else {
              // Add the role and send a private message to the user
              member.roles.add(bugResolverRole);
              action = "Added"; // Set the action to added
            }
            break;
          case "expressjs":
            // Express.js role
            let expressjsRole = guild.roles.cache.find(
              (role) => role.id === process.env.expressjsRoleID
            );
            if (member.roles.cache.has(expressjsRole.id)) {
              // Remove the role and send a private message to the user
              member.roles.remove(expressjsRole);
              action = "Removed"; // Set the action to removed
            } else {
              // Add the role and send a private message to the user
              member.roles.add(expressjsRole);
              action = "Added"; // Set the action to added
            }
            break;
          case "mongo":
            // MongoDB/Mongoose role
            let mongoRole = guild.roles.cache.find(
              (role) => role.id === process.env.mongoRoleID
            );
            if (member.roles.cache.has(mongoRole.id)) {
              // Remove the role and send a private message to the user
              member.roles.remove(mongoRole);
              action = "Removed"; // Set the action to removed
            } else {
              // Add the role and send a private message to the user
              member.roles.add(mongoRole);
              action = "Added"; // Set the action to added
            }
            break;
          case "react":
            // React role
            let reactRole = guild.roles.cache.find(
              (role) => role.id === process.env.reactRoleID
            );
            if (member.roles.cache.has(reactRole.id)) {
              // Remove the role and send a private message to the user
              member.roles.remove(reactRole);
              action = "Removed"; // Set the action to removed
            } else {
              // Add the role and send a private message to the user
              member.roles.add(reactRole);
              action = "Added"; // Set the action to added
            }
            break;
          case "redux":
            // Redux role
            let reduxRole = guild.roles.cache.find(
              (role) => role.id === process.env.reduxRoleID
            );
            if (member.roles.cache.has(reduxRole.id)) {
              // Remove the role and send a private message to the user
              member.roles.remove(reduxRole);
              action = "Removed"; // Set the action to removed
            } else {
              // Add the role and send a private message to the user
              member.roles.add(reduxRole);
              action = "Added"; // Set the action to added
            }
            break;
          case "tailwindcss":
            // Tailwind CSS role
            let tailwindcssRole = guild.roles.cache.find(
              (role) => role.id === process.env.tailwindcssRoleID
            );
            if (member.roles.cache.has(tailwindcssRole.id)) {
              // Remove the role and send a private message to the user
              member.roles.remove(tailwindcssRole);
              action = "Removed"; // Set the action to removed
            } else {
              // Add the role and send a private message to the user
              member.roles.add(tailwindcssRole);
              action = "Added"; // Set the action to added
            }
            break;
          default:
            // Unknown button
            console.log("Unknown button");
        }

        // Defer the reply to prevent an error
        await interaction.deferReply({ ephemeral: true });

        // Edit the original message to show a confirmation message for 3 seconds, then delete it
        await interaction.editReply({
          content: `${action} **${interaction.customId}** role`, // Use the action variable in the content,
          ephemeral: true,
        });
        // setTimeout(() => interaction.deleteReply(), 3000);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// Listen for guildMemberAdd event
client.on("guildMemberAdd", (member) => {
  // Get the welcome channel by name
  try {
    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.name === "hall-of-fame"
    );
    if (!welcomeChannel) return; // Return if no channel found

    // Send a message to the welcome channel
    welcomeChannel.send(
      `Hey ${member.guild.roles.everyone.toString()} Welcome ${member} to the server! 🎉
 We are glad to have you here and hope you enjoy your stay! 😊`
    );

    // Send a welcome message to the user
    member.send(
      `Hey ${member}, welcome to the server! 🎉
 
We are happy to have you here and hope you enjoy your stay! 😊
 
Before you start chatting, please take a moment to read the <#1134951435281383535> channel and follow them at all times. We want to keep this server a friendly and respectful place for everyone. 🙏
 
Also, don't forget to check out the <#1135079664377921777> channel and pick a role that suits you. You can choose from different roles based on your interests, skills, or preferences. By choosing a role, you can access more channels and features in the server. 🌟
 
If you have any questions or need any help regarding to the server or channel, feel free to ask in the <#1134954498666791074> channel or contact one of the staff members. We are always here to assist you. 👍
 
Thank you for joining and have fun! 😄`
    );
  } catch (error) {
    console.log(error);
  }
});

client.login(token);
