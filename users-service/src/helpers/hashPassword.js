import bcryptjs from 'bcryptjs';

const hashPassword = password => bcryptjs.hashSync(password, bcrypt.genSaltSync(12));

export default hashPassword;