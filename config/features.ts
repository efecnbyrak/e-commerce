export const featuresConfig = {
    payment: {
        enabled: process.env.PAYMENT_ENABLED === "true",
        providers: ["stripe", "iyzico"],
        defaultProvider: "stripe",
    },
    search: {
        enabled: true,
        provider: "local",
    },
    auth: {
        registrationEnabled: true,
        twoFactorAuth: false,
    },
};
