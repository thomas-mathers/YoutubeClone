import { LoginRequest, LoginResponse } from "../models";
import { getHeaders } from "../get-headers";

async function login(body: LoginRequest): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
    });
    return await response.json();
}

export { login }