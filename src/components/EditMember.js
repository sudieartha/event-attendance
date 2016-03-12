import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import keycode from 'keycode';

class EditMember extends Component {
    constructor(props) {
        super(props);

        this.saveMember = this.saveMember.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onInputEnter = this.onInputEnter.bind(this);

        this.standardActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.cancel}
                />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.saveMember}
                />
        ];

        this.state = {
            nameInput: '',
            phoneInput: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showEditMember) {
            let nameValue = '';
            let phoneValue = '';

            if (nextProps.selectedMember) {
                nameValue = nextProps.selectedMember.name;
                phoneValue = nextProps.selectedMember.phone;
            }
            else {
                nameValue = nextProps.searchInputValue;
            }

            this.setState({
                nameInput: nameValue,
                phoneInput: phoneValue
            });
        }
        else {
            this.setState({
                nameInput: '',
                phoneInput: ''
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.showEditMember || this.props.showEditMember;
    }

    saveMember() {
        let member = {
            name: this.state.nameInput,
            phone: this.state.phoneInput
        };

        let uid = this.props.selectedMember ? this.props.selectedMember.uid : null;

        this.props.saveMember(member, uid);
    }

    onInputEnter() {
        if (keycode(event) === 'enter') {
            this.saveMember();
        }
    }   

    cancel() {
        this.props.onCancel();
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.showEditMember} actions={this.standardActions} modal={true}>
                    <TextField defaultValue={this.state.nameInput} hintText="" floatingLabelText="Name" fullWidth={true}
                        />
                    <TextField defaultValue={this.state.phoneInput} type="tel" hintText="" floatingLabelText="Phone Number"
                        fullWidth={true} onKeyDown={this.onInputEnter}/>
                </Dialog>
            </div>
        );
    }
}

EditMember.propTypes = {
    showEditMember: PropTypes.bool,
    searchInputValue: PropTypes.string,
    selectedMember: PropTypes.object,
    saveMember: PropTypes.func,
    onCancel: PropTypes.func
};

export default EditMember;