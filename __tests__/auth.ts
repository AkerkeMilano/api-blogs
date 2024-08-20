import { ADMIN_AUTH } from "../src/settings";

export const authUser = () => {
    const buff = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff.toString('base64')
    return {'authorization': 'Basic ' + codedAuth}
}