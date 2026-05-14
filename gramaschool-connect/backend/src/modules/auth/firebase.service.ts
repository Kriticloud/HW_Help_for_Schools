import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private app: admin.app.App | null = null;
  private readonly logger = new Logger(FirebaseService.name);

  constructor() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (projectId && projectId !== 'your-firebase-project-id') {
      if (!admin.apps.length) {
        this.app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        });
      } else {
        this.app = admin.apps[0]!;
      }
    } else {
      this.logger.warn(
        'Firebase credentials not configured. Auth endpoints will not work until FIREBASE_PROJECT_ID is set.',
      );
    }
  }

  async verifyIdToken(
    idToken: string,
  ): Promise<admin.auth.DecodedIdToken> {
    if (!this.app) {
      throw new Error('Firebase is not configured. Set FIREBASE_PROJECT_ID in .env');
    }
    return this.app.auth().verifyIdToken(idToken);
  }

  async sendPushNotification(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<string> {
    if (!this.app) {
      this.logger.warn('Firebase not configured — push notification skipped');
      return 'skipped';
    }
    return this.app.messaging().send({
      token,
      notification: { title, body },
      data,
    });
  }
}
