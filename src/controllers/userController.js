const UserModel = require("../models/user");

/* Función que permite la creación de un usuario */
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, currentPassword, role, active } =
      req.body;
    /* Verificar si el usuario existe consultandolo por su email */
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    /* Crear un nuevo usuario si no existe en la DB */
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      currentPassword,
      role,
      active,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

/* Función que devuelve en un array todos los usuarios de la BD */
exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al consultar los usuarios", error: error.json });
  }
};

/* Función que devuelve un usuario por su ID */
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al consultar los usuarios", error: error.json });
  }
};

/* Función que permite editar un usuario por su ID */
exports.editUser = async (req, res) => {
  try {
    const { firstname, lastname, email, currentPassword, role, active } =
      req.body;
    /* Buscar y actualizar el usuario */
    const updateduser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        currentPassword,
        role,
        active,
      },
      { new: true, runValidators: true }
    );
    console.log(updateduser);

    if (!updateduser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(updateduser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al consultar los usuarios", error: error.json });
  }
};

/* Función que permite eliminar un usuario por su ID */
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al consultar los usuarios", error: error.json });
  }
};

/* Función que permite inactivar un usuario por su ID */
exports.inactivateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { active: "inactive" },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario inactivado" });
  } catch (error) {}
};

/* Función que permite consultar los usuarios con email de Gmail */
exports.getUsersByGmail = async (req, res) => {
    try {
        console.log("Consultando usuarios con email de Gmail");
        const gmailUsers = await UserModel.find({ email: /@gmail\.com$/ });
        console.log(gmailUsers);
        if(gmailUsers.length === 0){
            return res.status(404).json({ message: "No hay usuarios con email de Gmail" });
        }
        res.status(200).json(gmailUsers);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error al consultar los usuarios", error: error.json });
    }
}

/* Función para inactivar todos los usuarios excepto el usuario con rol admin */
exports.inactivateNonAdminUsers = async (req, res) => {
    try{
        /* const inactiveUsers = await UserModel.updateMany({ role: 'user' }, { active: 'inactive' }); */
        const inactiveUsers = await UserModel.updateMany({ role: { $ne: 'admin' } }, { active: 'inactive' });
        if(inactiveUsers.modifiedCount === 0){
            return res.status(404).json({ message: "No hay usuarios para inactivar" });
        }
        res.status(200).json({ message: "Todos los usuarios fueron inactivados" });
    }catch(error){
        res
        .status(500)
        .json({ message: "Error al consultar los usuarios", error: error.json });
    }
}
