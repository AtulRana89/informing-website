# Default User Credentials

This document contains all the default user credentials for testing different roles and account types in the Informing Science system.

## Administrator Users

### Super Administrator
- **Email:** superadmin@example.com
- **Password:** superadmin123
- **Roles:** super-admin, administrator
- **Account Type:** colleague
- **Status:** active
- **Description:** Highest level administrator with all permissions

### Administrator
- **Email:** admin@example.com
- **Password:** admin123
- **Roles:** administrator
- **Account Type:** colleague
- **Status:** active
- **Description:** System administrator with administrative privileges

## Editorial Users

### Editor in Chief
- **Email:** editorchief@example.com
- **Password:** editorchief123
- **Roles:** editor-in-chief, editor
- **Account Type:** colleague
- **Status:** active
- **Description:** Senior editor with editorial management responsibilities

### Editor
- **Email:** editor@example.com
- **Password:** editor123
- **Roles:** editor
- **Account Type:** colleague
- **Status:** active
- **Description:** Regular editor for manuscript review and management

## Reviewer Users

### Reviewer
- **Email:** reviewer@example.com
- **Password:** reviewer123
- **Roles:** reviewer
- **Account Type:** colleague
- **Status:** active
- **Description:** Manuscript reviewer with approved reviewer status

## Member Users

### Active Member
- **Email:** member@example.com
- **Password:** member123
- **Roles:** None
- **Account Type:** member
- **Status:** active
- **Description:** Active paying member with full access

### Pending Member
- **Email:** pending@example.com
- **Password:** pending123
- **Roles:** None
- **Account Type:** member
- **Status:** pending
- **Description:** Member with pending membership approval

### Student Member
- **Email:** student@example.com
- **Password:** student123
- **Roles:** None
- **Account Type:** member
- **Status:** active
- **Description:** Student member with active membership

## Colleague Users

### Colleague (Non-Member)
- **Email:** colleague@example.com
- **Password:** colleague123
- **Roles:** None
- **Account Type:** colleague
- **Status:** active
- **Description:** Non-paying colleague with basic access

## Special Cases

### Inactive User
- **Email:** inactive@example.com
- **Password:** inactive123
- **Roles:** None
- **Account Type:** member
- **Status:** expired (Inactive)
- **Description:** Deactivated user account for testing

## Password Pattern

All default passwords follow the pattern: `[username]123`
- Username is the part before `@` in the email address
- Example: `admin@example.com` → password: `admin123`

## Usage Instructions

1. **Start the server:**
   ```bash
   cd server
   npm start
   ```

2. **Access the application:**
   - Open http://localhost:3000 in your browser

3. **Login with any of the above credentials**

4. **Test different user types:**
   - Use administrator accounts to test admin features
   - Use editor accounts to test editorial workflows
   - Use reviewer accounts to test review processes
   - Use member accounts to test member-specific features
   - Use colleague accounts to test basic functionality

## Creating New Users

To create these default users in a fresh database:

```bash
cd server
npm run create-users
```

To create only the admin user:

```bash
cd server
npm run create-admin
```

## Security Note

⚠️ **Important:** These are default credentials for development and testing purposes only. In production:

1. Change all default passwords immediately
2. Use strong, unique passwords
3. Implement proper password policies
4. Enable two-factor authentication
5. Regularly rotate passwords
6. Monitor for suspicious login attempts

