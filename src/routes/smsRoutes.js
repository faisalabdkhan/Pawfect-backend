const express = require('express');
const router = express.Router();
const request = require('request');

// ✅ Test Route
router.get('/test', (req, res) => {
    res.json({ message: 'Backend working fine!' });
});

// ✅ Send OTP Route
router.post('/send-otp', (req, res) => {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
        return res.status(400).json({ error: 'Mobile Number Required' });
    }

    const options = {
        method: 'POST',
        url: `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-C6E3C3D79AB4406&flowType=SMS&mobileNumber=${mobileNumber}`,
        headers: {
            authToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUM2RTNDM0Q3OUFCNDQwNiIsImlhdCI6MTc1MzA3NTI3OCwiZXhwIjoxOTEwNzU1Mjc4fQ.fK4WF60bUofwqy1cqsqyXooj5--VJhOMJZ6_Z6_wzdsdgRYLwslLeRvLBMqQE8QxAyX89evr6B1i4rK3dO5ohA'
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error('Send OTP Error:', error);
            return res.status(500).json({ error: 'Failed to send OTP' });
        }

        try {
            const responseData = JSON.parse(body);
            res.json({ message: 'OTP Sent Successfully', data: responseData });
        } catch (e) {
            console.error('Raw Response:', body);
            res.status(500).json({ error: 'Invalid response from OTP service', raw: body });
        }
    });
});

// ✅ Validate OTP Route
router.post('/validate-otp', (req, res) => {
    const { mobileNumber, verificationId, code } = req.body;

    if (!mobileNumber || !verificationId || !code) {
        return res.status(400).json({ error: 'All fields (mobileNumber, verificationId, code) are required' });
    }

    const options = {
        method: 'GET',
        url: `https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${mobileNumber}&verificationId=${verificationId}&customerId=C-C6E3C3D79AB4406&code=${code}`,
        headers: {
            authToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUZBNTY5QzEzODY0QjQ5OSIsImlhdCI6MTcyMDY3NzcwOSwiZXhwIjoxODc4MzU3NzA5fQ.IKzKR57hg8vdCQux-GnGbuxw1H9BMXxrrJOS_OwUl2TZ2XxDZpDof9wcvenw6yG2Ygjcpfr8dEMVizPZaWf-KA'
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error('Validate OTP Error:', error);
            return res.status(500).json({ error: 'Failed to validate OTP' });
        }

        try {
            const responseData = JSON.parse(body);
            res.json({ message: 'OTP Validation Result', data: responseData });
        } catch (e) {
            res.status(500).json({ error: 'Invalid response from OTP service' });
        }
    });
});

module.exports = router;