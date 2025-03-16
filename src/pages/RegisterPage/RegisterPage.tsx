import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/userContext"
import "./RegisterPage.css"
import { Link } from "react-router-dom";

interface IForm {
    username:string;
	email: string;
	password: string;
    image:string
}
// yup validation
export function RegisterPage() {
	const {register: userRegister} = useUserContext()

	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: "onSubmit",
	});
	const onSubmit = async (data: IForm) => {
		userRegister(data.username, data.email, data.password, data.image)
	};
	return (
		<div className="content-registration-div">
			<div className="registration-div">
				<form onSubmit={handleSubmit(onSubmit)} className="registration-form">
					<h1>
						Registration
					</h1>
					<label>
						Username:
						<input
							type="username"
							{...register("username", {
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
						<p className="error-message">{formState.errors.username?.message}</p>
					</label>
					
					<label>
						Email:
						<input
							type="email"
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
						<p className="error-message">{formState.errors.email?.message}</p>
					</label>
					<label>
						Password:
						<input
							type="password"
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
						<p className="error-message">{formState.errors.password?.message}</p>
					</label>
					<label>
						Image:
						<input
							type="url"
							{...register("image", {
								required: {
									value: true,
									message: "Field is required",
								},
								minLength: {
									value: 7,
									message: "Length should be > 7",
								}
							})}
						/>
						<p className="error-message">{formState.errors.image?.message}</p>
					</label>
					<button type="submit">Submit</button>
					<div>
						<Link to="/login">Go to login</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
