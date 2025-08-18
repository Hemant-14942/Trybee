
const failedAuth = (req, res) => {
  res.status(401).json({
    error: true,
    message: "Failed Login",
  });
};

const successAuth = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

const logout = (req, res) => {
  req.session = null;
  req.logout((err) => {
    if (err) console.error("Logout error:", err);
    res.redirect(process.env.CLIENT_URL);
  });
};

export { failedAuth, successAuth, logout };
