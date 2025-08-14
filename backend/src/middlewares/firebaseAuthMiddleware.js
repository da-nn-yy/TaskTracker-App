import admin from '../config/firebase.js';

export const authenticateFirebaseToken = async (req, res, next) => {
  // Temporary development bypass - remove this in production!
  if (process.env.NODE_ENV === 'development' && !process.env.FIREBASE_PROJECT_ID) {
    console.log('⚠️ Development mode: Bypassing Firebase authentication');
    req.user = {
      uid: 'dev_user_123',
      email: 'dev@example.com',
      displayName: 'Development User',
      photoURL: null
    };
    return next();
  }

  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Authorization header missing or invalid format'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Token missing'
      });
    }

    try {
      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Add user info to request
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.display_name,
        photoURL: decodedToken.picture || decodedToken.photo_url
      };

      next();
    } catch (firebaseError) {
      console.error('Firebase token verification failed:', firebaseError.message);

      if (firebaseError.code === 'auth/id-token-expired') {
        return res.status(401).json({
          error: 'Token expired',
          message: 'Please sign in again'
        });
      }

      if (firebaseError.code === 'auth/id-token-revoked') {
        return res.status(401).json({
          error: 'Token revoked',
          message: 'Please sign in again'
        });
      }

      return res.status(403).json({
        error: 'Invalid token',
        message: 'Authentication failed'
      });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Authentication service unavailable'
    });
  }
};
