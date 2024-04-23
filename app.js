import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import "./passport-setup.js"; // Assurez-vous que cela configure correctement Passport

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Assurez-vous que cette URL est correcte
    credentials: true,
  })
);

// Configuration de session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Utilisez une variable d'environnement pour votre secret de session
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "false", // Pour les environnements mixtes (développement et production)
      httpOnly: true, // Pour empêcher l'accès aux cookies via JavaScript côté client
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes pour l'authentification Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // La connexion a réussi, rediriger vers la page d'accueil du client
    res.redirect(process.env.FRONTEND_URL + "/home");
  }
);

// Route de login échoué
app.get("/login", (req, res) => res.send("Login Failed"));

// Définissez d'autres routes au besoin

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
