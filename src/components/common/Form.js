import { Component } from "react";

class Form extends Component {
	//function for validation
	validate = () => {
		let { error } = this.schema.validate(this.state.data);
		//if not error
		if (!error) return null;
		const errors = {};
		//loop through validator error and add in errors const according to data fields
		error.details.map((detail) => {
			errors[detail.path[0]] = detail.message;
		});

		return errors;
	};

	handleOnChange = (e) => {
		let data = { ...this.state.data };
		data[e.currentTarget.name] = e.currentTarget.value;
		this.setState({
			data,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//call the validator function
		let errors = this.validate();
		//set the errors in the state
		this.setState({
			errors: errors || {},
		});

		//if has error return, we don't want to submit form
		if (errors) return;

		this.doSubmit(e.target);
	};

	handleImageChange = (e) => {
		if (
			e.target.files[0].name
				.split(".")
				.pop()
				.match(/(jpg|jpeg|png)$/)
		) {
			this.setState({
				data: {
					...this.state.data,
					image: e.target.files[0],
				},
				imagePreview: URL.createObjectURL(e.target.files[0]),
			});
		} else {
			this.setState({ errors: { image: "The file type ." + e.target.files[0].name.split(".").pop() + " is not supported" } });
		}
	};

	handleDisableButton = () => {
		const { disableButton } = this.state;
		this.setState({
			disableButton: !disableButton,
		});
	};
}

export default Form;
