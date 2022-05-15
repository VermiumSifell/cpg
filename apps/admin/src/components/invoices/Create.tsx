import
{
    ArrayInput,
    AutocompleteArrayInput,
    BooleanInput,
    Create, DateInput, FormTab,
    NumberInput,
    ReferenceArrayInput, AutocompleteInput,
    SimpleFormIterator,
    TabbedForm,
} from "react-admin";
//@ts-ignore
import MarkdownInput from 'ra-input-markdown';
import { currencyCodes } from "lib/Currencies";
import RenderFullName from "../../lib/RenderFullName";

export const CreateInvoices = (props: any) =>
(
    <Create {...props}>
        <TabbedForm>
            <FormTab label="General">
                {/* @ts-ignore */}
                <ReferenceArrayInput filterToQuery={searchText => ({
                    "personal.first_name": searchText,
                })} perPage={100} source="customer_uid" reference="customers">
                    <AutocompleteInput
                        source="customers"
                        label="Customer"
                        required={true}
                        allowEmpty={false}
                        optionText={RenderFullName}
                    />
                </ReferenceArrayInput>
                <AutocompleteInput required={true} source="status" choices={[
                    { id: "draft", name: "draft" },
                    { id: "refunded", name: "refunded" },
                    { id: "collections", name: "collections" },
                    { id: "payment_pending", name: "payment_pending" },
                    { id: "active", name: "active" },
                    { id: "pending", name: "pending" },
                ]} />
                <AutocompleteInput required={true} source="payment_method" choices={[
                    { id: "none", name: "none" },
                    { id: "manual", name: "manual" },
                    { id: "bank", name: "bank" },
                    { id: "paypal", name: "paypal" },
                    { id: "credit_card", name: "credit_card" },
                    { id: "swish", name: "swish" },
                ]} />
                <NumberInput required={true} label="Amount" source="amount" />
                <AutocompleteInput required={true} source="currency" choices={currencyCodes.map(e =>
                {
                    return { id: e, name: e };
                })} />
                <NumberInput min={0} max={100} required={true} label="Tax Rate" source="tax_rate" />
                <BooleanInput label="Paid" defaultValue={false} source="paid" />
                <BooleanInput label="Notified" defaultValue={false} source="notified" />
            </FormTab>
            <FormTab label="Dates">
                <DateInput label="Invoiced date" source="dates.invoice_date" defaultValue={new Date().toLocaleDateString()} />
                <DateInput label="Due date" source="dates.due_date" defaultValue={new Date().toLocaleDateString()} />
            </FormTab>
            <FormTab label="Miscellaneous">

                <MarkdownInput source="notes" />

                <ArrayInput required={true} source="items">
                    <SimpleFormIterator>
                        <MarkdownInput source="notes" />
                        <NumberInput required={true} label="Amount" source="amount" />
                        <NumberInput label="Quantity" defaultValue={1} source="quantity" />
                        {/* @ts-ignore */}
                        <ReferenceArrayInput filterToQuery={searchText => ({
                            "name": searchText,
                        })} perPage={100} source="product_id" reference="products">
                            <AutocompleteInput
                                source="product"
                                label="Product"
                                required={true}
                                allowEmpty={false}
                                optionText={"name"}
                            />
                        </ReferenceArrayInput>
                    </SimpleFormIterator>
                </ArrayInput>

                <ReferenceArrayInput filterToQuery={(searchText: string) => ({
                    "id": searchText,
                })} perPage={100} source="transactions" reference="transactions">
                    <AutocompleteArrayInput optionText={(record) => record?.id?.toString() ?? ""} />
                </ReferenceArrayInput>

            </FormTab>
        </TabbedForm>
    </Create>
);