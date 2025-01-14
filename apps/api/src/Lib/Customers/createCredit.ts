import { ICreditCustomer } from "interfaces/Customer.interface";
import { TPaymentCurrency } from "interfaces/types/Currencies";
import crypto from "crypto";

export default function createCredit(
    amount: number,
    currency: TPaymentCurrency,
    notes = ""
): ICreditCustomer
{
    // @ts-ignore
    return {
        notes,
        amount,
        currency,
    }
}