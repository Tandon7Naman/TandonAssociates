# 🧪 Test Account Credentials

## ✅ Test Account Created

### 📧 Email
```
test@tandonassociates.com
```

### 🔐 Password
```
Test@1234
```

---

## 🔗 Login URL

**Live Application**: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/login

---

## 📋 How to Create Test Account

### Option 1: Via Registration Page (Recommended)
1. Go to: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/register
2. Enter:
   - **Name**: Test User
   - **Email**: test@tandonassociates.com
   - **Password**: Test@1234
3. Click "Sign Up"
4. You'll be redirected to login
5. Login with the credentials above

### Option 2: Via API (cURL)
```bash
curl -X POST https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@tandonassociates.com",
    "password": "Test@1234"
  }'
```

### Option 3: Via API (JavaScript)
```javascript
const response = await fetch('https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@tandonassociates.com',
    password: 'Test@1234'
  })
})

const data = await response.json()
console.log(data)
```

---

## 🧪 Testing Steps

### 1. Register Account
- Go to registration page
- Enter test credentials
- Submit form

### 2. Login
- Go to login page
- Enter email: `test@tandonassociates.com`
- Enter password: `Test@1234`
- Click "Sign In"

### 3. Verify Dashboard
- You should see the dashboard
- Check all menu items work
- Verify data loads

### 4. Test Features
- Create a contract
- Create a case
- Create compliance record
- Upload a document
- Check activities log

---

## ✅ Password Requirements

Your test password meets all requirements:
- ✅ At least 8 characters (8 chars)
- ✅ Uppercase letter (T)
- ✅ Lowercase letters (est)
- ✅ Number (1234)
- ✅ Special character (@)

---

## 🔒 Security Notes

- This is a test account for development/testing only
- Do NOT use this in production
- Change password after testing
- Delete account when done testing

---

## 🐛 Troubleshooting

### "User already exists"
- The account already exists
- Try logging in with the credentials above
- Or use a different email

### "Invalid input"
- Check password meets requirements
- Verify email format is correct
- Ensure all fields are filled

### "Too many requests"
- Rate limiting is active (3 requests/minute)
- Wait 1 minute and try again

### "Registration failed"
- Check your internet connection
- Verify the API is responding
- Check browser console for errors

---

## 📊 Test Scenarios

### Scenario 1: Basic Login
1. Register with test credentials
2. Login with email and password
3. Verify dashboard loads

### Scenario 2: Create Contract
1. Login
2. Go to Contracts
3. Click "New Contract"
4. Fill in details
5. Submit
6. Verify contract appears in list

### Scenario 3: Create Case
1. Login
2. Go to Cases
3. Click "New Case"
4. Fill in details
5. Submit
6. Verify case appears in list

### Scenario 4: Upload Document
1. Login
2. Go to Documents
3. Click "Upload"
4. Select PDF/DOC file
5. Submit
6. Verify document appears in list

### Scenario 5: Check Activities
1. Login
2. Go to Activities
3. Verify all actions are logged
4. Check timestamps

---

## 🔗 Useful Links

- **Login Page**: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/login
- **Register Page**: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/register
- **Dashboard**: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/dashboard
- **API Docs**: See SECURITY.md

---

## 📝 Notes

- Test account is for development/testing only
- All data created with this account is test data
- Feel free to create, modify, and delete test data
- Monitor logs for any errors

---

**Ready to test? Go to the login page and use the credentials above! 🚀**

---

**Email**: test@tandonassociates.com  
**Password**: Test@1234  
**Status**: ✅ Ready to use
