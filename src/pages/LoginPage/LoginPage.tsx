import { useForm } from "react-hook-form";

interface IForm {
	email: string;
	password: string;
}
// yup validation
export function LoginPage() {
	const { register, handleSubmit, formState, clearErrors} = useForm<IForm>({
		mode: 'onSubmit',

	});
	const onSubmit = (data: IForm) => {
		console.log(data);
	};
	// (⓿_⓿) (●'◡'●) (✿◠‿◠)
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Email:
					<input
						type="email"
						{...register("email", {
							required: {value: true, message: "Field is required"},
							minLength: {value: 7, message: "Length should be > 7"},
							maxLength: {value: 50, message: "Length should be < 50"},
						})}
                        onFocus={() => {clearErrors("email")}}
					/>
					
                <p>{formState.errors.email?.message}</p>
				</label>
				<label>
					Password:
					<input
						type="password"
						{...register("password", {
							required: {value: true, message: "Field is required"},
							minLength: {value: 7, message: "Length should be > 7"},
							maxLength: {value: 50, message: "Length should be < 50"},
						})}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
