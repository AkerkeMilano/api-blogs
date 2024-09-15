export type LoginEmailType = {
    loginOrEmail: string,
    password: string
}

export type DeviceSessionsType = {
    userId: string,
    deviceId: string,
    deviceName: string | undefined,
    iat: string | null,
    ip: string | undefined,
    exp: string | null
}