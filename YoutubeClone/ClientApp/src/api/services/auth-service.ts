import { LoginRequest, LoginResponse } from "../models";
import { getHeaders } from "../get-headers";

async function login(body: LoginRequest): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
    });

    const responseBody = await response.json();

    if (response.status === 401) {
        throw new Error('Invalid username or password');
    }

    return responseBody;
}

export { login }