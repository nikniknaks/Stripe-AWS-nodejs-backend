import { Stripe } from 'stripe';

export const createCustomer = async (customer: CustomerInput): Promise<Stripe.Customer> => {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
        apiVersion: process.env.STRIPE_API_VERSION,
        typescript: true,
    });

    const params: Stripe.CustomerCreateParams = {
        name: customer.name,
        email: customer.email,
        phone: String(customer.phone),
        address: {
           line1: customer.address?.line1,
           line2: customer.address?.line2,
           city: customer.address?.city,
           state: customer.address?.province,
           postal_code: customer.address?.postalCode,
           country: customer.address?.country,
        },
    };

    // Create the Customer:
    try {
        const stripeCustomer: Stripe.Customer = await stripe.customers.create(params);
        return stripeCustomer;
    }
    catch (error) {
        console.log('Unable to save customer to Stripe Platform');
        throw(error);
    };
};
