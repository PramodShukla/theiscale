exports.createUser = async (req, res) => {
  try {
    res.status(200).send({
      status: true,
      message: "User Created Successfully",
    });
  } catch (e) {
    res.status(500).send({
      status: true,
      message: "user created successfully",
    });
  }
};
