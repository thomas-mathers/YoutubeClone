import { LoginRequest, LoginResponse } from "./models";

async function login(request: LoginRequest): Promise<LoginResponse> {
    return { token: '', user: { dateCreated: '', email: '', givenName: '', id: '', phoneNumber: '', profilePictureUrl: '', surname: '', userName: ''  } }
}

export { login }