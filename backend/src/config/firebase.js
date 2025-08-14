import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  try {
    // Try to initialize with service account if available
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
      const serviceAccount = {
        type: process.env.FIREBASE_TYPE || 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      console.log('✅ Firebase Admin initialized successfully with service account');
    } else {
      // Fallback to default app for development
      admin.initializeApp();
      console.log('⚠️ Firebase Admin initialized with default credentials (development mode)');
    }
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
    // Try to initialize with default app as last resort
    try {
      admin.initializeApp();
      console.log('⚠️ Firebase Admin initialized with default credentials (fallback)');
    } catch (fallbackError) {
      console.error('❌ Firebase Admin fallback initialization also failed:', fallbackError.message);
      console.log('🔧 Please check your Firebase configuration');
    }
  }
}

export default admin;
