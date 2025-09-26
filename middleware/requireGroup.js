// middleware/requireGroup.js
// Gate by a single Cognito group (e.g. "Admin")
module.exports = function requireGroup(groupName) {
  return (req, res, next) => {
    const groups = req.jwt?.['cognito:groups'];
    const ok = Array.isArray(groups) ? groups.includes(groupName) : groups === groupName;
    if (!ok) return res.status(403).json({ error: 'forbidden', need: groupName });
    next();
  };
};
