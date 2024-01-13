import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Turnstile } from '@marsidev/react-turnstile';

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();

	async function setToken(token) {

		const res = await fetch('/api/verify', {
			method: 'POST',
			body: JSON.stringify({ token }),
			headers: {
				'content-type': 'application/json'
			}
		})

		const data = await res.json()
		if (data.success) {
			// the token has been validated
		}
	}
	return (
		<>
			<Input
				placeholder='Email'
				fontSize={14}
				type='email'
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Input
				placeholder='Password'
				fontSize={14}
				size={"sm"}
				type='password'
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
			{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}
			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={() => login(inputs)}
			>
				Log in
			</Button>

			<Turnstile
				siteKey='0x4AAAAAAAP8-pmCLxfngs0S'
				onSuccess={(token) => setToken(token)}
			/>
		</>
	);
};

export default Login;
