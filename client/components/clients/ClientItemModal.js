import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import {
    Input,
    CustomInput,
    Label,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";
import Select from "react-select";
import renderText from "../common/form/renderText";
import * as crudAction from '../../actions/crudAction';
import { client_type, client_status } from '../../constants/defaultValues';
import { CLIENTUPDATE, CLIENTVIEW } from '../../constants/entity';

class ClientItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTypeOption: this.props.initialValues.client_type,
            selectedStatusOption: this.props.initialValues.client_status,
            selectedActiveOption: this.props.initialValues.is_active,
            client_type: client_type,
            client_status: client_status,
        };
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        const { initialValues } = newProps;
        this.setState({
            selectedTypeOption: initialValues.client_type,
            selectedStatusOption: initialValues.client_status,
        })
    }

    handleTypeChange = selectedTypeOption => {
        this.setState({ selectedTypeOption: selectedTypeOption.value });
    };

    handleStatusChange = selectedStatusOption => {
        this.setState({ selectedStatusOption: selectedStatusOption.target.value });
    };

    handleActiveChange = selectedActiveOption => {
        this.setState({ selectedActiveOption: selectedActiveOption.target.value });
    };

    submitForm(formProps) {
        formProps.client_type = this.state.selectedTypeOption;
        formProps.client_status = this.state.selectedStatusOption;
        formProps.is_active = this.state.selectedActiveOption;
        let id = formProps.id;
        let formdata = {
            company_name: formProps.company_name,
            company_name_ar: formProps.company_name_ar,
            cr_number: formProps.cr_number,
            vat_rno: formProps.vat_rno,
            address: formProps.address,
            client_type: formProps.client_type,
            client_status: formProps.client_status,
            contact_person_name: formProps.contact_person_name,
            contact_person_pos: formProps.contact_person_pos,
            contact_person_phone: formProps.contact_person_phone,
            is_active: formProps.is_active,
        }
        let api_url = 'clients/update';
        let refreshDispathchData = {
            entity: CLIENTVIEW,
            reqUrl: 'clients/getitem'
        }
        
        let refreshLoglistCriteria = {
            reqUrl: 'logs/getloglist',
            order_by_column: 'logs.created_at',
            order_by_dir: 'DESC',
            type: 1,
            data_id: id
        }

        this.props.actions.submitReduxForm(CLIENTUPDATE, api_url, formdata, id, refreshDispathchData, refreshLoglistCriteria);
        this.props.toggle();
    }

    render() {
        const { handleSubmit } = this.props;
        let data_id = -1;
        let selected_typeoption_index = 0;
        if (this.props.initialValues) {
            data_id = this.props.initialValues.id;
            for (let i = 0; i < this.state.client_type.length; i++) {
                if (this.props.initialValues && this.state.client_type[i].value === this.props.initialValues.client_type) {
                    selected_typeoption_index = i;
                }
            }
        }
        return (
            <Modal isOpen={this.props.is_modalopen} toggle={this.props.toggle}>
                <Form onSubmit={handleSubmit(this.submitForm)}>
                    <ModalHeader toggle={this.props.toggle}>
                        Update Client
                    </ModalHeader>
                    <ModalBody>
                        <Input type="hidden" name="id" value={data_id}></Input>
                        <FormGroup>
                            <Field type="text" name="company_name"
                                component={renderText}
                                label="Company Name"
                                placeholder="Company name in english"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field type="text" name="company_name_ar"
                                component={renderText}
                                label="Company Name (AR)"
                                placeholder="Company name in arabic" />
                        </FormGroup>
                        <FormGroup>
                            <Field type="text" name="cr_number"
                                component={renderText}
                                label="CR Number"
                                placeholder="CR Number" />
                        </FormGroup>
                        <FormGroup>
                            <Field type="text" name="vat_rno"
                                component={renderText}
                                label="VAT RNO"
                                placeholder="VAT RNO" />
                        </FormGroup>
                        <FormGroup>
                            <Field type="textarea" name="address"
                                component={renderText}
                                label="Address" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Type</Label>
                            <Select
                                defaultValue={{
                                    label: this.state.client_type[selected_typeoption_index].label,
                                    value: this.state.client_type[selected_typeoption_index].value
                                }}
                                onChange={this.handleTypeChange}
                                options={this.state.client_type} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Client Status</Label>
                            <CustomInput id="exampleCustomRadio1" label="Client" name="customRadio" type="radio" value="1"
                                onChange={this.handleStatusChange} checked={this.state.selectedStatusOption == 1} />
                            <CustomInput id="exampleCustomRadio2" label="Prospect" name="customRadio" type="radio" value="2"
                                onChange={this.handleStatusChange} checked={this.state.selectedStatusOption == 2} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Active</Label>
                            <CustomInput id="exampleCustomRadio3" label="Active" name="activeRadio" type="radio" value="1"
                                onChange={this.handleActiveChange} checked={this.state.selectedActiveOption == 1} />
                            <CustomInput id="exampleCustomRadio4" label="Inactive" name="activeRadio" type="radio" value="0"
                                onChange={this.handleActiveChange} checked={this.state.selectedActiveOption == 0} />
                        </FormGroup>
                        <FormGroup>
                            <Field type="text" name="contact_person_name"
                                component={renderText}
                                label="Contact Person Name"
                                placeholder="Contact Person Name" />
                            <Field type="text" name="contact_person_pos"
                                component={renderText}
                                label="Contact Person Position"
                                placeholder="Contact Person Position" />
                            <Field type="text" name="contact_person_phone"
                                component={renderText}
                                label="Contact Person Phone"
                                placeholder="Contact Person Phone" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Colxx className="text-center" lg="12">
                                <Button className="btn btn-primary" type="submit">
                                    Save
                            </Button>
                                <Button className="btn btn-primary" onClick={this.props.toggle}>
                                    Cancel
                            </Button>
                            </Colxx>
                        </Row>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

const validateClientData = values => {
    const errors = {};
    const requiredFields = ["company_name", "company_name_ar", "cr_number", "vat_rno", "address"];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = "(The " + field + " field is required.)";
        }
    });
    return errors;
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

ClientItemModal = reduxForm({
    form: "ClientsCU_Form",
    validate: validateClientData,
    enableReinitialize: true
})(ClientItemModal);

export default connect(null, mapDispatchToProps)(ClientItemModal);