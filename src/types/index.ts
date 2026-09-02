// Global TypeScript Domain Definitions
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'content_admin' | 'editor' | 'youth_mp' | 'moderator' | 'viewer';
}

export interface Constituency {
  id: string;
  name: string;
  region: string;
  code: string;
}

export interface YouthMP {
  id: string;
  fullName: string;
  constituencyId: string;
  region: string;
  bio?: string;
  photoUrl?: string;
}
