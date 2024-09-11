const express = require("express");
var methodOverride = require("method-override");

const app = express();
const port = 4000;
const path = require("path");

app.set("view engin", "ejs");
app.set("views", path.join("views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let info = [
  {
    username: "username",
    name: "name",
    bio: "bio",
    password: "password",
    email: "email",
  },
];

app.get("/insta/error", (req, res) => {
  res.render("error.ejs");
});

app.get("/insta/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/insta/profile", (req, res) => {
  res.render("profile.ejs", { info });
});
app.get("/insta/edit", (req, res) => {
  res.render("editprop.ejs");
});
app.patch("/insta", (req, res) => {
  let { username, name, bio, password, confirmPassword, email } = req.body;
  // let q = `INSERT INTO user VALUES ('${username}','${email}','${password}')`;
  // info.push({ username, name, bio, password, email });
  for (user of info) {
    user.username = username;
    user.name = name;
    user.bio = bio;
  }
  if (password != confirmPassword) {
    return res.redirect("/insta/error");
  }

  res.redirect("/insta/profile");
});
app.get("/insta/home", (req, res) => {
  res.render("home.ejs");
});
app.get("/insta/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/insta/explore", (req, res) => {
  res.render("explore.ejs");
});
app.get("/insta/thread", (req, res) => {
  res.render("thread.ejs");
});
app.all("*", (req, res, next) => {
  res.render("home.ejs");
  next(new errorHandler(404, "Page not found"));
});

app.listen(port, () => {
  console.log(`server is listing at port: ${port}`);
});
