import { useForm } from "react-hook-form";

interface IForm {
	email: string;
	password: string;
}
// yup validation
export function LoginPage() {
	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: "onSubmit",
	});
	const onSubmit = async (data: IForm) => {
		console.log(data);
		const result = await fetch("http://localhost:8000/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})

	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
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
					<p>{formState.errors.email?.message}</p>
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
					<p>{formState.errors.password?.message}</p>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
