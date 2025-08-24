const request = require('request');
const UserService = require('../services/mongo/UserService');

// const authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTZEMzgzQkRBNDkwMDQ0RCIsImlhdCI6MTc1NTg2MjM5NiwiZXhwIjoxOTEzNTQyMzk2fQ.ieZOaGd9DAMGL2cZXMlgvJbuJlOY1bnS3NO9OasUIdGmQUNqHZ-qlpTVLWrnMle21fgCELCdIsm17ZRTc5kw0g';
// const customerId = 'C-6D383BDA490044D';

const authToken = process.env.AUTH_TOKEN;
const customerId = process.env.CUSTOMER_ID;

// Send OTP
exports.sendOtp = async (req, res) => {
    const { mobileNumber } = req.body;
    
    const options = {
        method: 'POST',
        url: `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${customerId}&flowType=SMS&mobileNumber=${mobileNumber}`,
        headers: { 'authToken': authToken }
    };
    
    request(options, async (error, response) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        
        try {
            const providerResponse = JSON.parse(response.body);
            
            if (providerResponse.responseCode === 200 && providerResponse.data?.verificationId) {
                // Check if user exists (don't create here, just find)
                let user = await UserService.getOneUser({ mobileNumber });
                
                // Only create user if they don't exist
                if (!user) {
                    user = await UserService.createUser({ 
                        mobileNumber,
                        isVerified: false,
                        hasPets: false  // New users start with no pets
                    });
                }
                
                // Update with verification data
                await UserService.updateUser(user._id, {
                    verificationId: providerResponse.data.verificationId,
                    isVerified: false,
                    verificationExpiry: new Date(Date.now() + 10 * 60 * 1000)
                });
                
                res.status(200).json({ 
                    success: true, 
                    message: 'OTP sent successfully'
                });
            } else {
                res.status(400).json({ 
                    success: false, 
                    error: 'Failed to send OTP' 
                });
            }
        } catch (e) {
            res.status(500).json({ 
                success: false, 
                error: 'Invalid response from SMS service' 
            });
        }
    });
};


// Verify OTP
exports.verifyOtp = async (mobileNumber, code) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Verifying OTP for:', mobileNumber, 'Code:', code);
            
            // Get user and verification data from database
            const user = await UserService.getOneUser({ mobileNumber });
            console.log('User found for verification:', user);
            
            if (!user) {
                return reject(new Error('User not found'));
            }
            
            if (!user.verificationId) {
                return reject(new Error('No verification session found. Please request a new OTP.'));
            }

            // Check if verification has expired
            if (user.verificationExpiry && user.verificationExpiry < new Date()) {
                // Clear expired verification data
                await UserService.updateUser(user._id, {
                    verificationId: null,
                    verificationExpiry: null
                });
                return reject(new Error('OTP has expired. Please request a new OTP.'));
            }

            const options = {
                method: 'GET',
                url: `https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${mobileNumber}&verificationId=${user.verificationId}&customerId=${customerId}&code=${code}`,
                headers: { 'authToken': authToken }
            };

            console.log('Verification URL:', options.url);

            request(options, async (error, response) => {
                if (error) {
                    console.error('Verification API Error:', error);
                    return reject(error);
                }
                
                try {
                    const result = JSON.parse(response.body);
                    console.log('Verification Result:', result);
                    
                    // Check for successful verification (adjust based on your API response)
                    if (result.responseCode === 200 || result.data?.verificationStatus === 'SUCCESS') {
                        await UserService.updateUser(user._id, {
                            isVerified: true,
                            verificationId: null,
                            verificationExpiry: null
                        });
                        console.log('User verified successfully');
                        resolve({ success: true, ...result });
                    } else {
                        console.log('OTP verification failed:', result);
                        reject(new Error(result.message || 'Invalid OTP'));
                    }
                } catch (e) {
                    console.error('Parse error in verification:', e);
                    reject(new Error('Invalid response from verification service'));
                }
            });
        } catch (error) {
            console.error('Verification process error:', error);
            reject(error);
        }
    });
};
