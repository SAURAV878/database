import crypto from 'crypto';

export const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

export const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export const verifyPassword = (passwordAttempt, saltDB, hashFromDB) => {

    const newHash = hashPassword(passwordAttempt, saltDB);

    return newHash === hashFromDB;
}
