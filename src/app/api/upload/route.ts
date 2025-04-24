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

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'logo' or 'company'

    if (!file || !type) {
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get storage bucket
    const bucket = getStorage().bucket();

    // Define storage path and create file
    const path = `users/${uid}/${type}/${file.name}`;
    const fileRef = bucket.file(path);

    // Upload file
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      }
    });

    // Get download URL (expires in 1 year)
    const [downloadURL] = await fileRef.getSignedUrl({
      action: 'read',
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
    });

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
