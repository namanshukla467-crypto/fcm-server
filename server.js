const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log("Server running");
});
