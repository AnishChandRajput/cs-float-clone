import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const router = Router();

function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

function toPublicUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
}

router.post('/register', async (req, res) => {
  try {
    const username = String(req.body.username ?? '').trim();
    const email = String(req.body.email ?? '').trim().toLowerCase();
    const password = String(req.body.password ?? '');
    const confirmPassword = String(req.body.confirmPassword ?? '');

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must have at least 3 characters.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    return res.status(201).json({
      message: 'Account created successfully.',
      user: toPublicUser(user),
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    return res.status(500).json({ message: 'Unable to register right now.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email ?? '').trim().toLowerCase();
    const password = String(req.body.password ?? '');

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No account found for that email.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    return res.status(200).json({
      message: 'Logged in successfully.',
      user: toPublicUser(user),
    });
  } catch {
    return res.status(500).json({ message: 'Unable to login right now.' });
  }
});

export default router;
