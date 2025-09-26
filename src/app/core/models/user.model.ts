export interface User {
  id: string;
  email: string;
  roles: string[];   // مثل: ['admin', 'editor']
  token?: string;    // اختیاری چون می‌تونه جدا ذخیره بشه
}