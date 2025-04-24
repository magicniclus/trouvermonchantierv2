import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { initAdmin } from '@/firebase/firebase.admin';

// Initialize Firebase Admin if not already initialized
initAdmin();

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get request body
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Extract file path from URL
    const fileUrl = new URL(url);
    const pathFromUrl = decodeURIComponent(fileUrl.pathname.split('/o/')[1].split('?')[0]);

    // Get storage bucket and delete file
    const bucket = getStorage().bucket();
    const fileRef = bucket.file(pathFromUrl);
    await fileRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
