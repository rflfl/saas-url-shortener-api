import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, config.jwt_secret, { expiresIn: '1h' });
}