const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const moment = require("moment");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MySQLStore = require("express-mysql-session")(session);

const port = 500;
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: ["frontend.fizitech.org"],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

const options = {
  host: "localhost",
  user: "c2413927c_matota",
  password: "A[q3[x8BC2Y%",
  database: "c2413927c_lion-print",
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "secret",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 86400000,
    },
  })
);

// CONNEXION A LA BASE DE DONNEES
const Bdd = mysql.createConnection(options);

// =================================================================
//                                                                 =
//                              UTILISATEUR                        =
//                                                                 =
// =================================================================

// utilisateurs
app.post("/creatUser", (req, res) => {
  const id = "USER_" + Date.now() * 3;
  const sql =
    "INSERT INTO users (`idUser`, `nomUser`, `postnomUser`, `prenomUser`, `email`, `telephone`) VALUES(?)";
  const values = [
    id,
    req.body.nom,
    req.body.postnom,
    req.body.prenom,
    req.body.email,
    req.body.telephone,
  ];

  Bdd.query(sql, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

app.get("/messagerie", (req, res) => {
  return res.send("La fummée blanche");
});

// Récupération de plusieurs utilisateurs
app.get("/recupUsers", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY idUser DESC";

  Bdd.query(sql, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

app.get("/", (req, res) => {
  return res.send("Message de la lourdeur");
});

// Récupération d'un seul utilisateur
app.get("/recupUser/:idUser", (req, res) => {
  const id = req.params.idUser;

  const sql = "SELECT * FROM users WHERE idUser = ?";

  Bdd.query(sql, [id], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Supprimer un utilisateur
app.delete("/supprUser/:idUser", (req, res) => {
  const id = req.params.idUser;

  const sql = "DELETE FROM users WHERE idUser = ?";

  Bdd.query(sql, [id], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modification de l'utilisateur
app.put("/modifUser/:idUser", (req, res) => {
  const idUser = req.params.idUser;

  const sql =
    "UPDATE users SET nomUser = ?, postnomUser = ?, prenomUser = ?, email = ?, telephone = ?, role = ? WHERE idUser = ?";

  Bdd.query(
    sql,
    [
      req.body.nom,
      req.body.postnom,
      req.body.prenom,
      req.body.email,
      req.body.telephone,
      req.body.role,
      idUser,
    ],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json(donnees);
    }
  );
});

// =================================================================
//                                                                 =
//                              PRODUITS                           =
//                                                                 =
// =================================================================

// Création produit
app.post("/creatProd", (req, res) => {
  const codeProd = "PROD_" + Date.now() * 4;
  const sql =
    "INSERT INTO produits(`codeProd`, `designProd`, `Prix`, `categorie`) VALUES(?)";

  const values = [
    codeProd,
    req.body.designation,
    req.body.prix,
    req.body.categorie,
  ];

  Bdd.query(sql, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Récupération de tous les articles
app.get("/recupProds", (req, res) => {
  const sql = "SELECT * FROM produits ORDER BY codeProd DESC";

  Bdd.query(sql, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Récupération d'un seul produit
app.get("/recupProd/:codeProd", (req, res) => {
  const codeProd = req.params.codeProd;
  const sql = "SELECT * FROM produits WHERE codeProd = ?";

  Bdd.query(sql, [codeProd], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modification d'un article
app.put("/modifProd/:codeProd", (req, res) => {
  const codeProd = req.params.codeProd;
  const sql =
    "UPDATE produits set designProd = ?, Prix = ?, categorie = ? WHERE codeProd = ?";

  Bdd.query(
    sql,
    [req.body.designation, req.body.prix, req.body.categorie, codeProd],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json(donnees);
    }
  );
});

// Suppression d'un produit
app.delete("/supprimer/:codeProd", (req, res) => {
  const codeProd = req.params.codeProd;
  const sql = "DELETE FROM produits WHERE codeProd = ?";

  Bdd.query(sql, [codeProd], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// =================================================================
//                                                                 =
//                              CLIENTS                            =
//                                                                 =
// =================================================================

// Création d'un client
app.post("/creatClient", (req, res) => {
  const numClient = "CLIENT_" + Date.now() * 2;
  const sql =
    "INSERT INTO client(`numClient`, `nomClient`,	`postnomClient`,	`prenomClient`,	`email`, `telephone`) VALUES(?)";

  const values = [
    numClient,
    req.body.nom,
    req.body.postnom,
    req.body.prenom,
    req.body.email,
    req.body.telephone,
  ];

  Bdd.query(sql, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Récupération de tous les clients
app.get("/recupClient", (req, res) => {
  const sql = "SELECT * FROM client ORDER BY numClient DESC";
  Bdd.query(sql, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Récupération d'un client
app.get("/recupCli/:numCli", (req, res) => {
  const num = req.params.numCli;
  const sql = "SELECT * FROM client WHERE numClient = ?";
  Bdd.query(sql, [num], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modification du client
app.put("/modifCli/:numCli", (req, res) => {
  const num = req.params.numCli;
  const sql =
    "UPDATE client SET nomClient=?, postnomClient=?, prenomClient=?, email=?, telephone=? WHERE numClient = ?";
  Bdd.query(
    sql,
    [
      req.body.nom,
      req.body.postnom,
      req.body.prenom,
      req.body.email,
      req.body.telephone,
      num,
    ],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json(donnees);
    }
  );
});

// Suppression du client
app.delete("/suppClient/:numCli", (req, res) => {
  const num = req.params.numCli;
  const sql = "DELETE FROM client WHERE numClient = ?";
  Bdd.query(sql, [num], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// =================================================================
//                                                                 =
//                              COMMANDE                           =
//                                                                 =
// =================================================================

// Création d'une commande
app.post("/commande", (req, res) => {
  const num = "CDE_" + Date.now() * 4;
  const date = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
  const nomUser = req.session.nomUser;
  const sql =
    "INSERT INTO commande(`numCom`,	`dateCommande`, `client`, `nomUser`) VALUES(?)";
  const values = [num, date, req.body.nomClient, nomUser];
  Bdd.query(sql, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Récupération du numéro de la dernière commande
app.get("/dernCommande", (req, res) => {
  const sql = "SELECT * FROM commande ORDER BY numCom DESC LIMIT 1";

  Bdd.query(sql, (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

// Récupération de toutes les commandes dont le statut n'est pas NULL
app.get("/recupCmds", (req, res) => {
  const sql =
    "SELECT * FROM commande WHERE statut IS NOT NULL ORDER BY numCom DESC ";

  Bdd.query(sql, (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

// Récupération de toutes les commandes dont le statut est NULL
app.get("/recupCmdsNull", (req, res) => {
  const sql =
    "SELECT * FROM commande WHERE statut IS NULL ORDER BY numCom DESC ";

  Bdd.query(sql, (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

// Terminer la commande en changeant le statut
app.put("/terminerCde/:num", (req, res) => {
  const statut = "En cours";
  const num = req.params.num;
  const sql = `UPDATE commande SET statut = ?  WHERE numCom = ?`;

  Bdd.query(sql, [statut, num], (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

app.put("/facturer/:numCom", (req, res) => {
  const statut = "Facturée";
  const num = req.params.numCom;
  const sql = `UPDATE commande SET statut = ?  WHERE numCom = ?`;

  Bdd.query(sql, [statut, num], (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

app.put("/annuler/:numCom", (req, res) => {
  const statut = "Annulée";
  const num = req.params.numCom;
  const sql = `UPDATE commande SET statut = ?  WHERE numCom = ?`;

  Bdd.query(sql, [statut, num], (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

app.delete("/suppCde/:numCom", (req, res) => {
  const num = req.params.numCom;
  const sql = "DELETE FROM commande WHERE numCom = ?";

  Bdd.query(sql, [num], (err, donnee) => {
    if (err) return res.json(err);
    return res.json(donnee);
  });
});

// =================================================================
//                                                                 =
//                       DETAILS COMMANDE                          =
//                                                                 =
// =================================================================

app.post("/destailCommande", (req, res) => {
  const id = Date.now();
  const sql =
    "INSERT INTO detailscom(`idDetailCom`,	`numCom`,	`desiProd`,	`quantite`) VALUES(?)";

  const values = [
    id,
    req.body.numCom,
    req.body.designProduit,
    req.body.quantProd,
  ];
  Bdd.query(sql, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

app.get("/recupDetComm/:num", (req, res) => {
  const numCom = req.params.num;
  const sql = `SELECT det.desiProd, det.quantite, prod.Prix FROM detailscom det JOIN produits prod ON prod.designProd = det.desiProd WHERE numCom = ?`;
  Bdd.query(sql, [numCom], (err, donnees) => {
    if (err) return res.json({ Message: "Impossible de charger les données" });
    return res.json(donnees);
  });
});

app.get("/recupNomClient/:num", (req, res) => {
  const numCom = req.params.num;
  const sql = `SELECT client FROM commande WHERE numCom = ?`;
  Bdd.query(sql, [numCom], (err, donnees) => {
    if (err) return res.json({ Message: "Impossible de charger les données" });
    return res.json(donnees);
  });
});

// =================================================================
//                                                                 =
//                    LOGIN    et LOGOUT                           =
//                                                                 =
// =================================================================

// Récupération de l'utilisateur connecté
app.get("/authentification", (req, res) => {
  if (req.session.nomUser) {
    return res.json({
      valid: true,
      nomUser: req.session.nomUser,
      role: req.session.role,
    });
  } else {
    return res.json({ valid: false });
  }
});

// Connexion au système
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND mdp = ?";

  Bdd.query(sql, [req.body.email, req.body.mdp], (err, donnees) => {
    if (err) return res.json(err);
    if (donnees.length > 0) {
      req.session.nomUser = donnees[0].nomUser;
      req.session.role = donnees[0].role;

      if (donnees[0].role === "admin") {
        return res.json({ Login: "admin" });
      } else if (donnees[0].role === "simple_user") {
        return res.json({ Login: "simple_user" });
      }
    } else {
      return res.json({ Login: false });
    }
  });
});

// Déconnexion
app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.json("success");
});

// =================================================================
//                                                                 =
//                            COMPTAGES                            =
//                                                                 =
// =================================================================

app.get("/nombreClients", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM client";

  Bdd.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});
app.get("/nombreCdesNulles", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM commande WHERE statut IS NULL";

  Bdd.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});

app.get("/nombreCdesEnCours", (req, res) => {
  const statut = "En cours";
  const sql = "SELECT COUNT(*) AS count FROM commande WHERE statut = ?";

  Bdd.query(sql, [statut], (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});

app.get("/nombreCdesFactur", (req, res) => {
  const statut = "Facturée";
  const sql = "SELECT COUNT(*) AS count FROM commande WHERE statut = ?";

  Bdd.query(sql, [statut], (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});

app.get("/nombreUtilisateurs", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM users";

  Bdd.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});

app.get("/nombreProduits", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM produits";

  Bdd.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});

app.get("/nombreCdesAnnul", (req, res) => {
  const statut = "Annulée";
  const sql = "SELECT COUNT(*) AS count FROM commande WHERE statut = ?";

  Bdd.query(sql, [statut], (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0].count);
  });
});

// LE SERVEUR
app.listen(port, () => {
  console.log(`Le serveur tourne au port ${port}`);
});
