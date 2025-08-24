# gcgfc
nbn

## User & Pet API Endpoints

### 1. Send OTP
POST `/sms/send-otp`
```
{
  "mobileNumber": "9842112222"
}
```

### 2. Validate OTP
POST `/sms/validate-otp`
```
{
  "mobileNumber": "9842112222",
  "verificationId": "...",
  "code": "123456"
}
```

### 3. Login (OTP-based)
POST `/users/login`
```
{
  "mobileNumber": "9842112222"
}
```
_Response:_ `{ message, user }`

### 4. Update Profile (after OTP)
POST `/users/update-profile`
```
{
  "mobileNumber": "9842112222",
  "name": "John Doe"
}
```
_Response:_ `user`

### 5. Add Pet
POST `/users/add-pet`
```
{
  "mobileNumber": "9842112222",
  "category": "Dog",
  "breed": "Labrador",
  "name": "Buddy",
  "gender": "Male",
  "height": 60,
  "weight": 25
}
```
_Response:_ `{ message, pet }`
