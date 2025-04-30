export interface UserDTO {
    id?: number;
    name: string;
    email: string;
    cell: string;
    userType: number;
  }
  
  export interface ChangePasswordDTO {
    currentPassword: string;
    newPassword: string;
  }