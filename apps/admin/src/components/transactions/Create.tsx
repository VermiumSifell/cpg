import { currencyCodes } from "lib/Currencies";
import { Create, DateInput, FormDataConsumer, FormTab, NumberInput, AutocompleteInput, TabbedForm, TextInput, SelectInput, ReferenceInput } from "react-admin";
import { getDate } from "../../lib/dateFormat";
import RenderFullName from "../../lib/RenderFullName";

export const CreateTransactions = (props: any) =>
(
    <Create {...props}>
        <TabbedForm>
            <FormTab label="Info">
                <SelectInput isRequired={true} source="statement" choices={[
                    { id: "income", name: "income" },
                    { id: "expense", name: "expense" },
                ]} defaultValue="income" />
                <FormDataConsumer>
                    {({ formData }) => formData.statement === "income" &&
                        <>
                            <ReferenceInput filterToQuery={(searchText: string) => ({
                                "personal.first_name": searchText,
                            })} perPage={100} source="customer_uid" reference="customers" allowEmpty>
                                <AutocompleteInput
                                    source="customers"
                                    label="Customers"
                                    fullWidth
                                    isRequired={formData.statement === "income"}
                                    optionText={RenderFullName}
                                />
                            </ReferenceInput>
                            <div>
                                <ReferenceInput filterToQuery={(searchText: string) => ({
                                    "id": searchText,
                                })} perPage={100} source="invoice_uid"
                                    reference="invoices" allowEmpty>
                                    <AutocompleteInput
                                        fullWidth
                                        isRequired={formData.statement === "income"}
                                        optionText={(record) => record?.id?.toString() ?? ""} />
                                </ReferenceInput>
                            </div>
                        </>
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData }) => formData.statement === "expense" &&
                        <>
                            <div>
                                <TextInput
                                    fullWidth
                                    required={formData.statement === "expense"}
                                    source="expense_information.invoice_id" label="Invoice id" />
                            </div>
                            <div>
                                <TextInput
                                    fullWidth
                                    required={formData.statement === "expense"}
                                    source="expense_information.company" label="Company" />
                            </div>
                            <div>
                                <TextInput
                                    fullWidth
                                    required={formData.statement === "expense"} source="expense_information.description" label="Description" />
                            </div>
                            <div>
                                <TextInput
                                    fullWidth
                                    required={formData.statement === "expense"} source="expense_information.notes" label="Notes" />
                            </div>
                        </>
                    }
                </FormDataConsumer>
                <NumberInput isRequired={true} label="Amount" source="amount" />
                <AutocompleteInput isRequired={true} source="currency" choices={currencyCodes.map(e =>
                {
                    return { id: e, name: e };
                })} />
                <NumberInput isRequired={true} label="Fees" source="fees" />
                <DateInput label="Payed at" source="date" defaultValue={getDate()} />
                <AutocompleteInput isRequired={true} source="payment_method" choices={[
                    { id: "none", name: "none" },
                    { id: "manual", name: "manual" },
                    { id: "bank", name: "bank" },
                    { id: "paypal", name: "paypal" },
                    { id: "credit_card", name: "credit_card" },
                    { id: "swish", name: "swish" },
                ]} fullWidth />
            </FormTab>
        </TabbedForm>
    </Create>
);