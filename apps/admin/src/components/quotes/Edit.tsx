/*
    customer_uid: ICustomer["uid"];
    items: IQuoteItem[];
    promotion_codes: IPromotionsCodes["id"][] | [];
    due_date: string;
    memo: string;
    payment_method: keyof IPayments;
    notified: boolean;
    created_invoice: boolean;
    tax_rate: number;
    currency: TPaymentCurrency;
    accepted: boolean;
    declined: boolean;

    export interface IQuoteItem
    {
        name: string;
        price: number;
        quantity: number;
    }
*/

import { ArrayInput, AutocompleteArrayInput, DateInput, Edit, FormTab, NumberInput, ReferenceArrayInput, ReferenceInput, AutocompleteInput, SimpleFormIterator, TabbedForm, TextInput } from "react-admin";
import CurrencyInput from "../../inputs/CurrencyInput";
import PaymentMethodInput from "../../inputs/PaymentMethodInput";
//@ts-ignore
import MarkdownInput from 'ra-input-markdown';
import RenderFullName from "../../lib/RenderFullName";
export default function EditQuote(props: any)
{
    return (
        <Edit {...props}>
            <TabbedForm>
                <FormTab label="General">
                    <ReferenceInput filterToQuery={(searchText: string) => ({
                        "personal.first_name": searchText,
                    })} perPage={100} source="customer_uid" reference="customers">
                        <AutocompleteInput
                            source="customers"
                            label="Customer"
                            required={true}
                            allowEmpty={false}
                            optionText={RenderFullName}
                        />
                    </ReferenceInput>
                    <ReferenceArrayInput filterToQuery={(searchText: string) => ({
                        "name": searchText,
                    })} perPage={100} source="promotion_codes" reference="promotion_codes">
                        <AutocompleteArrayInput
                            source="promotion_codes"
                            label="Promotion codes"
                            allowEmpty={false}
                            optionText="name"
                        />
                    </ReferenceArrayInput>
                    <CurrencyInput />
                    <PaymentMethodInput />
                    <DateInput label="Due date" source="due_date" defaultValue={new Date().toLocaleDateString()} />
                    <ArrayInput source="items">
                        <SimpleFormIterator>
                            <TextInput label="Name" source="name" />
                            <NumberInput label="Price" source="price" defaultValue={1} />
                            <NumberInput label="Quantity" defaultValue={1} source="quantity" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <MarkdownInput source="memo" />
                </FormTab>
            </TabbedForm>
        </Edit >
    )
}