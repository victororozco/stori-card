'use strict';
import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV || 'dev';
export const port = process.env.PORT || 3000;
export const mongoUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;
export const BUCKET_BASE = process.env.BUCKET_BASE;
export const BUCKET_KEY = process.env.BUCKET_KEY;
export const BUCKET_SECRET = process.env.BUCKET_SECRET;
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_PASS = process.env.GMAIL_PASS;
