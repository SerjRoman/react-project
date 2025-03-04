import { useForm } from "react-hook-form";

interface IForm {
    username:string;
	email: string;
	password: string;
    image:string
}
// yup validation
export function RegisterPage() {
	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: "onSubmit",
	});
	const onSubmit = async (data: IForm) => {
		console.log(data);
		const result = await fetch("http://localhost:8000/api/user/registration", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		// const res = await fetch("http://localhost:8000/api/user/...")
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				</label>
                <p>{formState.errors.username?.message}</p>
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
				</label>
                <p>{formState.errors.email?.message}</p>
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
					
				</label>
                <p>{formState.errors.password?.message}</p>
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
				</label>
                <p>{formState.errors.image?.message}</p>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
