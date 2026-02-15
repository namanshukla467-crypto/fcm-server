const express = require("express");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "globalchat-51d94",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Alive");
});

app.post("/send", async (req, res) => {
  const { token, title, body } = req.body;

  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body,
      },
    });

    res.status(200).send("Notification sent");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



