
  
  export type UserType = {
    id?: any;
    email: string;
    firstName: string;
    lastName: string;
    userLevel:number; // 1 super admin 2 admin 3 store user 4 user
    isAdmin?: boolean | null;
    logs?: any;
  };
  
