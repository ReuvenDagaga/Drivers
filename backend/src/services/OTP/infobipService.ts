import https from 'https';

export const sendOTP = (phoneNumber: string, otp: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            hostname: 'api.infobip.com',
            path: '/whatsapp/1/message/template',
            headers: {
                Authorization: `App ${process.env.INFOBIP_API_KEY}`,  // קובץ `.env`
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            maxRedirects: 20
        };

        const req = https.request(options, (res) => {
            let chunks: any[] = [];

            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
                const body = Buffer.concat(chunks).toString();
                console.log(`✅ OTP sent successfully: ${body}`);
                resolve();
            });
        });

        req.on("error", (error) => {
            console.error(`❌ Error sending OTP: ${error}`);
            reject(error);
        });

        const postData = JSON.stringify({
            messages: [
                {
                    from: "447860099299",  // מספר השולח שאושר ב-Infobip
                    to: phoneNumber,
                    messageId: Math.random().toString(36).substring(7), // מזהה ייחודי אקראי
                    content: {
                        templateName: "authentication",  // תבנית מאושרת
                        templateData: { body: { placeholders: [otp] } },
                        language: "en"
                    }
                }
            ]
        });

        req.write(postData);
        req.end();
    });
};
