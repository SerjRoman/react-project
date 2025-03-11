import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/userContext"
import "./LoginPage.css"

interface IForm {
	email: string;
	password: string;
}
// yup validation
export function LoginPage() {
	const {login} = useUserContext()

	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: "onSubmit",
	});
	const onSubmit = async (data: IForm) => {
		login(data.email, data.password)
	};
	return (
		<div className="loginContainer">
			<form onSubmit={handleSubmit(onSubmit)} className="loginForm">

				<div className="loginTitleContainer">
					<p className="loginTitle">Authorization</p>
				</div>


				<div className="loginInputsContainer">
					<label className="loginLabel">
						Email:
						<input
							className="loginInput"
							type="email"
							placeholder="Enter email..."
							{...register("email", {
								required: {
									value: true,
									message: "Field is required",
								},
								minLength: {
									value: 7,
									message: "Length should be > 7",
								},
								maxLength: {
									value: 50,
									message: "Length should be < 50",
								},
							})}
						/>
						<p className="loginError">{formState.errors.email?.message}</p>
					</label>
					<label className="loginLabel">
						Password:
						<input
							className="loginInput"
							type="password"
							placeholder="Enter password..."
							{...register("password", {
								required: {
									value: true,
									message: "Field is required",
								},
								minLength: {
									value: 7,
									message: "Length should be > 7",
								},
								maxLength: {
									value: 50,
									message: "Length should be < 50",
								},
							})}
						/>
						<p className="loginError">{formState.errors.password?.message}</p>
					</label>
				</div>
				

				<div className="loginButtonContainer">
					<button type="submit" className="loginButtonSubmit">Submit</button>
				</div>

			</form>
		</div>
	);
}
