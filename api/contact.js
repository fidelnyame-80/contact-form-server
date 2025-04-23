const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    const response = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      throw new Error("Failed to send data to Google Sheets");
    }

    res.status(200).json({ success: "Message successfully sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
