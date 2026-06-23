// Consistent response envelopes for the API.
// Success: { doc } or { docs }. Error: { errors: [{ msg }] }.

exports.ok = (res, payload, status = 200) => res.status(status).json(payload);

exports.okDoc = (res, doc, status = 200) => res.status(status).json({ doc });

exports.okDocs = (res, docs, status = 200) => res.status(status).json({ docs });

exports.fail = (res, msg, status = 500) =>
  res.status(status).json({ errors: [{ msg }] });
